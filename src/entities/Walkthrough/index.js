import { f7 } from "framework7-react";

/*

    Sobre el funcionamiento de este modulo:

    En cada step, se ejecuta una accion y se muestra un popover con texto de ayuda.

    El popover se mostrará sobre el componente con className=[step.target_el]. Los popups se 
    renderizan automaticamente en el componente Popover.js.
    
    Hay dos tipos de acciones, una para actualizar parametros del modelo y la otra que requiere
    renderizar componentes de react. Primero se ejecuta la actualizacion de parametros y luego 
    la otra, siempre y cuando el step tenga callback === true.
    
    Esta clase (WalkthroughModel) tiene acceso al modelo porque al definir el provider se 
    le pasa como argumento con "setModel(model)".
    
    Para renderizar componentes de la vista o ejecutar acciones, se usan los callbacks. En cada 
    componente donde haya que ejecutar una accion, hay que importar el WalkthroughCtx y asignarle 
    callbacks cuyo nombre coincida con la key del paso correspondiente.

*/

const STEPS = [
    ////// SectionDosif.js
    {
        page: "/params/",
        key: "",
        text: "Bienvenido.",
        popover_el: "help-popover-start",
        target_el: "help-target-start"
    }
];

const POPOVER_DELAY = 700;
const SCROLL_DELAY = 500;

export default class WalkthroughModel {
    constructor(){
        this.steps = STEPS;        
        this.currentIndex = -1;
        this.currentStep = null;
        this.model = null;
        this.callbacks = {};
    }

    setModel(model){
        this.model = model;
    }

    start() {
        this.currentIndex = -1;
        this.currentStep = null;
        this.next();
    }

    finish() {        
        //f7.popover.close("."+this.steps[this.currentIndex].popover_el);
        f7.views.main.router.navigate('/');
    }

    next() {

        this.currentIndex++;
        
        if(this.currentIndex >= this.steps.length){
            this.finish();
            return;
        }
        
        this.currentStep = this.steps[this.currentIndex];
        
        if(this.currentIndex > 0){
            if(this.currentStep.page !== this.steps[this.currentIndex-1].page){
                f7.views.main.router.navigate(this.currentStep.page);
            }
            //f7.popover.close("."+this.steps[this.currentIndex-1].popover_el);    
        }else
            f7.views.main.router.navigate(this.currentStep.page);

        if(this.currentStep.updateModel)
            this.model.update(this.currentStep.updateModel);

        if(this.currentStep.callback)
            if(this.callbacks[this.currentStep.key])
                this.callbacks[this.currentStep.key]();

        setTimeout(() => {
            const r = document.getElementsByClassName(this.currentStep.target_el);
            if(r.length > 0){
                r[0].scrollIntoView({block: "center", behavior: "smooth"});
                setTimeout(()=>{
                    try{
                        f7.popover.open("."+this.currentStep.popover_el, "."+this.currentStep.target_el, true);    
                    }catch(e){
                        console.log(e);
                    }
                }, POPOVER_DELAY);
            }else{
                console.log("Error de ayuda, elemento no existe: "+this.currentStep.target_el);
                this.next();
            }
        }, SCROLL_DELAY);
    }
}