import { App, View, f7 } from 'framework7-react';
import { App as cApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import {
    Home,
    Params,
    Velocity,
    Control,
    Info,
    About,
    Supplies,
    SuppliesList,
    Reports,
    ReportDetails
} from './views';
import ReportsPanel from './components/ReportsPanel';
import Popovers from './components/Popover';
import { ModelProvider, WalkthroughProvider } from './context';
import './index.css';

/*
    CRIOLLO
*/

// Navegacion
const pushState = page => window.history.pushState(null, null, page);

const f7params = {
    name: 'Calibrador Criollo',
    id: 'com.inta.criollo2',    
    dialog: {
        buttonOk: 'Aceptar',
        buttonCancel: 'Cancelar'
    },    
    routes: [
        { // Menu principal
            path: '/',
            component: Home,
            options: {
                transition: "f7-cover"        
            }
        },
        { // Menu informativo
            path: '/info/', 
            component: Info,
            on:{pageInit: ()=>pushState("info")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Seccion acerca de
            path: '/about/',
            component: About,
            on:{pageInit: ()=>pushState("about")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Seccion de parametros
            path: '/params/',
            component: Params,
            on:{pageInit: ()=>pushState("params")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Cronometro
            path: '/control/',
            component: Control,
            on:{pageInit: ()=>pushState("control")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Medicion de velocidad
            path: '/velocity/',
            component: Velocity,
            on:{pageInit: ()=>pushState("velocity")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Calculo de insumos
            path: '/supplies/',
            component: Supplies,
            on:{pageInit: ()=>pushState("supplies")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Lista de insumos
            path: '/suppliesList/',
            component: SuppliesList,
            on:{pageInit: ()=>pushState("suppliesList")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Lista de reportes
            path: '/reports/',
            component: Reports,
            on:{pageInit: ()=>pushState("reports")},
            options: {
                transition: "f7-cover"        
            }
        },
        { // Detalle de reporte
            path: '/reportDetails/:id',
            component: ReportDetails,
            on:{pageInit: ()=>pushState("reportDetails")},
            options: {
                transition: "f7-cover"        
            }
        }
    ]
};


if(Capacitor.isNativePlatform())
    cApp.addListener('backButton', () => {
        // Salir en vista principal
        if(f7.view.main.router.url === '/'){
            cApp.exitApp();
        }else{
            f7.view.main.router.back();
        }
    });
else
    window.addEventListener("popstate", () => {    
        f7.view.main.router.back();
    }, false);

const Criollo = () => (
    <App {...f7params}>
        <ModelProvider>
            <WalkthroughProvider>
                <View main url="/" className="app"/>
                <ReportsPanel />
                <Popovers />
            </WalkthroughProvider>
        </ModelProvider>
    </App>
);

export default Criollo;