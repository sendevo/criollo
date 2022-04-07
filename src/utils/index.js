export const error_messages = {
    recolected: "Debe indicar el peso recolectado",
    distance: "Debe indicar la distancia recorrida",
    work_width: "Debe indicar el ancho de labor",
    expected_dose: "Debe indicar la dosis prevista",
    work_velocity: "Debe indicar la velocidad de trabajo",
    time: "Debe indicar el tiempo de medición",
    pass_number: "Debe indicar la cantidad de pasadas",
    tray_area: "Debe indicar el área de la bandeja",
    tray_data: "Debe indicar los datos recolectados",
    tray_number: "Debe indicar la cantidad de bandejas",
    tray_distance: "Debe indicar la distancia entre bandejas",
    work_pattern: "Debe indicar el patrón de trabajo",
    field_name: "Debe indicar el nombre del lote",
    products: "La lista de productos tiene datos faltantes",
    work_area: "Debe indicar el área de trabajo"
};

export const set2Decimals = value => parseFloat(value.toFixed(2));

export const generateId = () => "_" + Math.random().toString(36).substr(2) + Date.now();

export const arrayAvg = (arr, attr) => arr.reduce((a, b) => a + b[attr], 0) / arr.length;

export const getClosest = (array, attr, value) => {
    const diffArr = array.map(v => Math.abs(value - v[attr]));
    const closestValue = Math.min(...diffArr);
    const index = diffArr.findIndex(v => v === closestValue);
    return array[index];
};