const round2 = x => Math.round(x*100)/100;

const K = (Qnom, Pnom) => 600*Qnom/Math.sqrt(Pnom);


export const presentationUnits = [
    "ml/ha",
    "gr/ha",
    "ml/100l",
    "gr/100l"
];

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

const computeProductVolume = (prod, vol, Qt) => { // Cantidad de insumo (gr o ml) por volumen de agua
    return prod.presentation === 0 || prod.presentation === 1 ? vol*prod.dose/Qt : vol*prod.dose/100;
}

export const computeSuppliesList = params => { // Lista de insumos y cargas para mezcla   
    const { A, T, Qt, products } = params;
    const Nc = A*Qt/T; // Cantidad de cargas
    const Ncc = Math.floor(Nc); // Cantidad de cargas completas
    const Vf = (Nc - Ncc)*T; // Volumen fraccional [L]
    const Ncb = Math.ceil(Nc); // Cantidad de cargas balanceadas
    const Vcb = A*Qt/Ncb; // Volumen de cargas balanceadas
    const Vftl = Vf/T < 0.2; // Detectar volumen fraccional total menor a 20%
    // Calcular cantidades de cada producto
    const pr = products.map(p => ({
        ...p, // Por comodidad, dejar resto de los detalles en este arreglo
        cpp: computeProductVolume(p, T, Qt)/1000, // Cantidad por carga completa [l o kg]
        cfc: computeProductVolume(p, Vf, Qt)/1000, // Cantidad por carga fraccional [l o kg]
        ceq: computeProductVolume(p, Vcb, Qt)/1000, // Cantidad por carga equilibrada [l o kg]
        total: computeProductVolume(p, T, Qt)*Nc/1000, // Cantidad total de insumo [l o kg]
    }));

    return {pr, Nc, Ncc, Vf, Ncb, Vcb, Vftl};
};