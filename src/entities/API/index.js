const round2 = x => Math.round(x*100)/100;

const K = (Qnom, Pnom) => 600*Qnom/Math.sqrt(Pnom);

export const computeQt = params => {
    const { Pt, Vt, d, Qnom, Pnom } = params;
    const Qt = Math.sqrt(Pt) * K(Qnom, Pnom) / Vt / d;
    return round2(Qt);
};

export const computePt = params => {
    const { Qt, Vt, d, Qnom, Pnom } = params;
    const sqPt = Qt * Vt * d / K(Qnom, Pnom);
    return round2(sqPt*sqPt);
};

export const computeVt = params => {
    const { Qt, Pt, d, Qnom, Pnom } = params;
    const Vt = K(Qnom, Pnom) * Math.sqrt(Pt) / Qt / d;
    return round2(Vt);
};

export const computeEffectiveFlow = params => {
    const { c, tms, Qt } = params;
    const th = 10; // Umbral en porcentaje
    const ef = round2(c / tms * 60000);
    const s = round2((ef - Qt) / Qt * 100);
    const ok = Math.abs(s) <= th;
    return { ef, s, ok };
};

export const computeSprayVolume = params => {
    const { Q, d, vel } = params;
    const vol = 600*Q / (d * vel);
    return round2(vol);
}

const computeSuppliesList = params => {    
    const {products, work_area, capacity} = params;

    const quantities = [];
    let total_weight = 0; // Peso total para calculo de cargas
    for(let p in products){
        const quant = products[p].density*work_area;
        total_weight += quant;
        if(products[p].presentation === 0)
            quantities.push(quant); // A granel -> cantidad
        else
            quantities.push(quant/products[p].presentation); // Cantidad de envases
    }
    
    // Calculo de cargas
    // Numero total de cargas (en decimal)
    const load_number = capacity ? total_weight/capacity : 0; 
    // Numero de cargas completas
    const complete_loads = Math.floor(load_number); 
    // Parte decimal de la carga
    const fraction_weight = capacity ? (load_number - complete_loads)*capacity : 0; 
    // Peso de cargas equilibradas
    const eq_load_weight = total_weight/Math.ceil(load_number);
    // Resumen a retornar
    const loads_data = capacity ? {load_number, complete_loads, fraction_weight, eq_load_weight} : null;

    return {status: "success", quantities, loads_data};
};

const exported = {    
    computeSuppliesList
};

export default exported;