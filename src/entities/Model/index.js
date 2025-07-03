import { generateId } from "../../utils";
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from "@capacitor/core";
import nozzles from '../../data/nozzles_droplet_sizes.json';

// A partir de version 5.0.0, se agrega modelo de migraciones
export const APP_NAME = "Criollo";
export const ANDROID_VERSION_CODE = "20"; // Para app store
export const VERSION_NAME = "5.0.0";
export const BUILD_DATE = 1751553918425; // 3-7-2025 11:45hs

// Lista de versiones
const DB_NAMES = [
    "criollo_model4",
    "criollo_model_5.0.0"
];

const migrationFunctions = [
    oldData => oldData // DB_NAMES[0] -> DB_NAMES[1] (no hay cambios)
];


class lsPreferences { // Fallback para localStorage en Capacitor
    constructor(){}

    get({key}){
        return new Promise(resolve => {
            const data = localStorage.getItem(key);
            resolve({value:data});
        });
    }

    set({key, value}){
        return new Promise(resolve => {
            localStorage.setItem(key, value);
            resolve();
        });
    }

    clear(){
        return new Promise(resolve => {
            localStorage.clear();
            resolve();
        });
    }
};

const ls = Capacitor.isNativePlatform() ? Preferences : new lsPreferences(); // Usar Capacitor Preferences o localStorage


const get_blank_report = () => {
    return {
        id: generateId(),
        name: "Sin nombre",
        comments: "",
        params:{},
        control: {},
        supplies: {},
        completed: {
            params: false,
            control: false,
            supplies: false
        },
        selected: false // Esto se usa en la vista de listado
    };
};

const defaultFormParams = {
    productDensity: 1, // Densidad del producto (g/l)
    workVelocity: 20, // Velocidad de trabajo (km/h)
    velocityMeasured: false, // Para disparar render en vista de parametros
    workPressure: 2, // Presion de trabajo (bar)
    workVolume: 56, // Volumen de aplicacion (l/ha)
    workFlow: 0.65, // Caudal de trabajo efectivo (l/min) por pico
    nominalFlow: 0.8, // Caudal nominal de pico seleccionado
    sprayFlow: null, // Caudal de pulverizacion (caudal de picos multiplicado por n de picos)
    nominalPressure: 3, // Presion nominal de pico seleccionado
    nozzleSeparation: 0.35, // Distancia entre picos (m)
    nozzleNumber: null, // Numero de picos
    nozzleSelection: [-1, -1, -1, -1], // Indices de picos seleccionados
    
    // Verificacion de picos
    samplingTimeMs: 30000, // 30000, 60000 o 90000
    collectedData: [], // Datos de jarreo
    verificationOutput: {},

    // Variables de insumos
    workArea: null, // Superficie de lote
    lotName: null, // Nombre del lote
    lotCoordinates: null, // Coordenadas del lote
    gpsEnabled: false, // Habilitacion coordenadas lote
    loadBalancingEnabled: true, // Habilitacion balanceo de carga
    capacity: null, // Capacidad del tanque
    products: [], // Lista de prductos
    supplies: {}, // Insumos y cantidades

    currentReport: get_blank_report(),
    reports: [], // Lista de reportes
};

// Esta clase Singleton se encarga de manejar el estado persistente de las variables globales.

export default class CriolloModel {
    constructor(){
        Object.assign(this, defaultFormParams);
        this.reports = []; // Esta variable debe ser persistente
        this.loadDatabase();
    }

    update(param, value){ // Actualizar uno o mas parametros
        let updated = false;
        if(typeof param === "string"){
            this[param] = value;
            updated = true;
        }
        if(typeof param === "object" && typeof value === "undefined"){
            Object.assign(this, param);
            updated = true;
        }
        if(updated)
            this.updateDatabase();
        else{ 
            //console.log("Error: no se pudo actualizar el modelo");
            Function.prototype();
        }
    }

    getNozzleName(selection) { // Obtener nombre del pico seleccionado
        let current = nozzles;
        for (let i = 0; i < selection.length; i++) {
            const level = selection[i];
            if (level === -1) break;

            if (Array.isArray(current)) {
                if (level >= 0 && level < current.length) {
                    current = current[level];
                } else {
                    return null;
                }
            } else if (current.childs && Array.isArray(current.childs)) {
                if (level >= 0 && level < current.childs.length) {
                    current = current.childs[level];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }

        return current && typeof current === 'object' ? current.long_name : null;
    }

    getNozzle = selection => {
        const level = selection.findIndex(x => x === -1); // Max prof. de seleccion
        const node = selection
            .slice(0, level) // Tomar los niveles seleccionados
            .reduce((acc, idx) => { // Nodo seleccionado
                if (!acc || !Array.isArray(acc.childs) || idx < 0) return null;
                return acc.childs[idx];
            }, { childs: nozzles });
        if(node){
            const hasParameters = node.b !== undefined && node.c !== undefined;
            return hasParameters ? node : null; // Retornar solo si tiene parametros para evitar error de calculo
        }
        return null;
    }

    /// Persistencia de parametros
    updateDatabase(){ // Guardar datos en localStorage
        const key = DB_NAMES[DB_NAMES.length - 1]; // Ultima version
        const value = JSON.stringify(this);
        ls.set({key, value});
    }

    async loadDatabase(){ // Recuperar datos de localStorage
        const jobs = DB_NAMES.map(name => ls.get({ key: name }));
        const results = await Promise.all(jobs);
        
        let currentIndex = -1;
        let currentData = null;

        for (let i = DB_NAMES.length - 1; i >= 0; i--) {
            const result = results[i];
            if (result.value) {
                currentIndex = i;
                try {
                    currentData = JSON.parse(result.value);
                } catch (e) {
                    console.error(`Fallo la lectura de datos para ${DB_NAMES[i]}`, e);
                    return null;
                }
                break;
            }
        }

        if (currentIndex === -1) {
            console.log("No se encontró una base de datos existente.");
            currentData = { ...defaultFormParams }; // Crear datos por defecto
            return null;
        }

        for (let i = currentIndex; i < DB_NAMES.length - 1; i++) {
            const migrationFn = migrationFunctions[i];
            if (typeof migrationFn !== "function") {
                console.warn(`Falta la migración de ${DB_NAMES[i]} a ${DB_NAMES[i+1]}`);
                break;
            }
            currentData = migrationFn(currentData);
        }

        await ls.set({
            key: DB_NAMES[DB_NAMES.length - 1],
            value: JSON.stringify(currentData)
        });

        for (let i = 0; i < DB_NAMES.length - 1; i++) // Limpiar versiones anteriores
            await ls.set({ key: DB_NAMES[i], value: null });

        Object.assign(this, currentData); // Actualizar el modelo con los datos cargados
    }

    clearForms() { // Limpiar formularios
        Object.assign(this, defaultFormParams);
        this.updateDatabase();
    }

    /// Reportes
    addParamsToReport(params) {
        this.currentReport.params = params;
        this.currentReport.completed.params = true;
    }

    addControlToReport(control) {
        this.currentReport.control = control;
        this.currentReport.completed.control = true;
    }

    addSuppliesToReport(results) {
        if(results.lotName.length > 1)
            this.currentReport.name = results.lotName;
        this.currentReport.supplies = results;
        this.currentReport.completed.supplies = true;             
    }

    getReport(id){
        const index = this.reports.findIndex(report => report.id === id);
        return index !== -1 ? this.reports[index] : null;
    }

    saveReport(){ // Guardar (finalizar) reporte
        this.currentReport.timestamp = Date.now();
        this.reports.push(this.currentReport);
        this.clearReport();
    }

    clearReport(){ // Limpiar reporte actual
        this.currentReport = get_blank_report();
        this.updateDatabase();
    }

    renameReport(id, name){
        const index = this.reports.findIndex(report => report.id === id);
        if(index !== -1){
            this.reports[index].name = name;
            this.updateDatabase();
            return {
                status: "success"
            };
        }else{
            return {
                status: "error",
                message: "Problema al renombrar reporte"
            };
        }
    }

    deleteReport(id){
        const index = this.reports.findIndex(report => report.id === id);
        if(index !== -1){
            this.reports.splice(index, 1);
            this.updateDatabase();
            return {
                status: "success"
            };
        }else{
            return {
                status: "error",
                message: "No se encontró el reporte"
            };
        }
    }
}