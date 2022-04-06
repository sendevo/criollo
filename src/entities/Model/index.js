import { generate_id } from "../../utils";
import { Storage } from '@capacitor/storage';
import { Capacitor } from "@capacitor/core";

const version = '4.0.0'; // Ante cualquier cambio en el modelo, se debe incrementar la version

const get_blank_report = () => {
    return {
        id: generate_id(),
        name: "Sin nombre",
        completed: {
        },
        selected: false // Esto se usa en la vista de listado
    };
};

export default class CriolloModel {
    constructor(){
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