import { generate_id } from "../../utils";
import { Storage } from '@capacitor/storage';
import { Capacitor } from "@capacitor/core";

const version = '4.0.0'; // Ante cualquier cambio en el modelo, se debe incrementar la version

const get_blank_report = () => {
    return {
        id: generate_id(),
        name: "Sin nombre",
        dose:{},
        distr: {},
        supplies: {},
        completed: {
            dose: false,
            distribution: false,
            supplies: false
        },
        selected: false // Esto se usa en la vista de listado
    };
};

export default class CriolloModel {
    constructor(){
        // Variables que no intervienen en los calculos
        this.gear = null; // Regulacion de la maquina
        this.main_prod = null; // Nombre de producto
        this.prod_density = null; // Densidad de fertilizante
        
        /* 
        // variables de campero 

        // Variables de dosificacion
        this.expected_dose = null; // Dosis prevista
        this.effective_dose = null; // Dosis efectiva
        this.expected_work_width = null; // Ancho de labor inicial
        this.recolected = null; // Peso total recolectado
        this.time = null;  // Tiempo de muestreo      
        this.work_velocity = null; // Velocidad de trabajo
        this.work_width = null; // Ancho de labor
        this.distance = null; // Distancia recorrida
        this.method = "direct"; // Uso de velocidad (directa/indirecta)
        
        // Variables de distribucion
        this.fitted_dose = null; // Dosis ajustada
        this.fitted_work_width = null; // Dosis ajustada
        this.tray_data = []; // Peso recolectado de bandejas
        this.tray_distance = null; // Distancia entre bandejas
        this.tray_number = null; // Cantidad de bandejas (= a tray_data.length)
        this.tray_area = null; // Area de bandeja
        this.pass_number = null; // Cantidad de pasadas
        this.work_pattern = "linear"; // Patron de trabajo, "circular" o "linear"        
        */

        // Variables de criollo
        this.time = null;
        this.workFlow = null;
        this.nozzleCnt = 0;

        
        
        
        
        
        
        // Variables de insumos
        this.work_area = null; // Superficie de lote
        this.field_name = null; // Nombre del lote
        this.capacity = null; // Capacidad de la fertilizadora
        this.products = []; // Lista de prductos
        this.quantities = []; // Cantidades de productos
        this.load_number = null; // Numero de cargas
        this.eq_load_weight = null; // Carga equilibrada

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