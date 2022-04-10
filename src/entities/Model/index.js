import { generateId } from "../../utils";
import { Storage } from '@capacitor/storage';
import { Capacitor } from "@capacitor/core";

// Esta clase Singleton se encarga de manejar el estado persistente de las variables globales.


// El almacenamiento de datos se realiza con el valor de la version.
// Las migraciones entre versiones no estan implementadas. 
// Ante cualquier cambio en el modelo, se debe incrementar la version.
const version = '4.0.0'; 

const get_blank_report = () => {
    return {
        id: generateId(),
        name: "Sin nombre",
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

export default class CriolloModel {
    constructor(){
        // Parametros de pulverizacion
        this.workVelocity = 20; // Velocidad de trabajo (km/h)
        this.velocityMeasured = false; // Para disparar render en vista de parametros
        this.workPressure = 2; // Presion de trabajo (bar)
        this.workVolume = 56; // Volumen de aplicacion (l/ha)
        this.workFlow = 0.65; // Caudal de trabajo efectivo (l/min)
        this.nominalFlow = 0.8; // Caudal nominal de pico seleccionado
        this.nominalPressure = 3; // Presion nominal de pico seleccionado
        this.nozzleSeparation = 0.35; // Distancia entre picos (m)
        
        // Verificacion de picos
        this.samplingTimeMs = 30000; // 30000, 60000 o 90000
        this.collectedData = []; // Datos de jarreo

        // Variables de insumos
        this.workArea = null; // Superficie de lote
        this.fieldName = null; // Nombre del lote
        this.gpsEnabled = false; // Habilitacion coordenadas lote
        this.loadBalancingEnabled = true; // Habilitacion balanceo de carga
        this.fieldCoordinates = []; // Ubicacion del lote
        this.capacity = null; // Capacidad del tanque
        this.products = []; // Lista de prductos
        this.supplies = {}; // Insumos y cantidades

        // Reportes
        this.reports = [];
        this.currentReport = get_blank_report();

        this.getFromLocalStorage();
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
            this.saveToLocalStorage();
        else 
            console.log("Error: no se pudo actualizar el modelo");
    }

    clear(params){ // Borrar lista de parametros
        for(let i = 0; i < params.length; i++)
            this[params[i]] = null;
        this.saveToLocalStorage();
    }


    /// Persistencia de parametros

    saveToLocalStorage(){ // Guardar datos en localStorage
        const key = "criollo_model"+version;
        const value = JSON.stringify(this);
        if(Capacitor.isNativePlatform())
            Storage.set({key, value});
        else
            localStorage.setItem(key, value);
    }

    getFromLocalStorage(){ // Recuperar datos de localStorage
        if(Capacitor.isNativePlatform())
            Storage.get({key: "criollo_model"+version}).then(result => {
                if(result.value)
                    Object.assign(this, JSON.parse(result.value));
                else{
                    console.log("Nueva version de CriolloModel");
                    Storage.clear();
                }
            });
        else{
            const content = localStorage.getItem("criollo_model"+version);
            if(content){
                const model = JSON.parse(content);
                if(model)
                    Object.assign(this, model);
            }else{ 
                // Si no hay datos en localStorage, puede ser por cambio de version, entonces borrar todo
                console.log("Nueva version de CriolloModel");
                localStorage.clear();
            }
        }
    }

    clearLocalStorage(){ // Limpiar datos de localStorage
        const key = "criollo_model"+version;
        if(Capacitor.isNativePlatform())
            Storage.remove({key});
        else
            localStorage.removeItem(key);
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
        if(results.field_name.length > 1)
            this.currentReport.name = results.field_name;
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
        this.saveToLocalStorage();
    }

    renameReport(id, name){
        const index = this.reports.findIndex(report => report.id === id);
        if(index !== -1){
            this.reports[index].name = name;
            this.saveToLocalStorage();
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
            this.saveToLocalStorage();
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