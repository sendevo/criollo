

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment';
import Toast from '../../components/Toast';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { logoCriollo, membreteCriollo } from '../../assets/base64';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = { // Definicion de estilos de las secciones del reporte
    header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 15] //[left, top, right, bottom]
    },
    subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 10]
    },
    section: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 10]
    },
    text: {
        fontSize: 12,
        bold: false,
        margin: [0, 3, 0, 3]
    },
    tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
    }
};

const reportHeader = { // Lo que aparece en cada pagina
    image: logoCriollo, // Logo base 64
    width: 50,
    margin: [10,10,10,10],
    alignment: "right"
};

const reportFooter = {
    image: membreteCriollo, // Membrete
    width: 350,
    margin: [15,10,10,10],
    alignment: "left"
};

const workPattern = {
    linear: "Ida y vuelta",
    circular: "En círculos"
};

const PDFExport = (report, share) => {
    //console.log(report);

    const reportContent = [ // Composicion de todo el documento
        {
            text: "Calibrador Criollo",
            style: "header"
        },
        {
            text: "Reporte de la labor",
            style: "subheader"
        },
        {
            text: "   Nombre: " + report.name,
            style: "subheader"
        },
        {
            text: "   Fecha y hora: " + moment(report.timestamp).format("DD/MM/YYYY HH:mm"),
            style: "subheader"
        }
    ];

    

    if (report.completed.supplies) {
        reportContent.push({
            text: "Cálculo de insumos",
            style: "section"
        });
        reportContent.push({
            text: "Lote: " + report.supplies.field_name,
            style: "text"
        });
        reportContent.push({
            text: "Superficie: " + report.supplies.work_area + " ha",
            style: "text"
        });

        const rows = [
            [
                {
                    text: "Producto",
                    style: "tableHeader"
                },
                {
                    text: "Dosis",
                    style: "tableHeader"
                },
                {
                    text: "Total",
                    style: "tableHeader"
                }
            ]
        ];

        report.supplies.products.forEach((prod, index) => {
            rows.push([
                prod.name,
                prod.density.toFixed(2) + " kg/ha",
                prod.presentation === 0 ?
                    report.supplies.quantities[index].toFixed(2) + " kg" :
                    Math.ceil(report.supplies.quantities[index]) + " envases de " + prod.presentation + " kg"
            ]);
        });

        reportContent.push({
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: rows
            },
            margin: [0, 0, 0, 15]
        });
    }

    const document = { // Documento
        header: reportHeader,
        footer: reportFooter,
        content: reportContent,
        styles: styles
    };

    // Generar y guardar
    const fileName = "Reporte Criollo "+moment(report.timestamp).format("DD-MM-YYYY HH-mm")+".pdf";    
    const pdfFile = pdfMake.createPdf(document);

    if(Capacitor.isNativePlatform()){
        
        const shareFile = (fileName, data) => {
            FileSharer.share({
                filename: fileName,
                base64Data: data,
                contentType: "application/pdf",
            }).then(() => {
                Toast("success", "Reporte compartido", 2000, "center");
            }).catch(error => {
                console.error("Error FileSharer: "+error.message);
                Toast("error", "Reporte no compartido", 2000, "center");
            });
        };

        const saveFile = fileName => {            
            pdfFile.getBase64(base64pdf => {                                
                Filesystem.writeFile({
                    data: base64pdf,
                    path: fileName,
                    directory: Directory.Documents,                    
                    replace: true
                }).then(() => {                    
                    if(share){
                        Toast("info", "Generando reporte...", 2000, "center");
                        shareFile(fileName, base64pdf);
                    }else 
                        Toast("success", "Reporte guardado en Documentos: "+fileName, 2000, "center");                    
                }).catch(err => {
                    console.log(err);
                    Toast("error", "Error al guardar el reporte", 2000, "center");
                });
            });
        };

        Filesystem.checkPermissions().then(permissions => {                        
            if(permissions.publicStorage === "granted"){ 
                saveFile(fileName);
            }else{
                Toast("info", "Permisos de almacenamiento no otorgados", 2000, "center");
                Filesystem.requestPermissions().then(res => {
                    console.log(res);
                    saveFile(fileName);
                }).catch(() => {
                    console.log("No se pudo guardar el reporte");
                });
            }
        });
    }else{
        pdfFile.download(fileName);
    }
};

export default PDFExport;