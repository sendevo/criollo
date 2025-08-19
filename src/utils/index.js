export const set2Decimals = value => Math.round(value * 100) / 100;

export const formatNumber = (value, decimals = 2) => value === "number" ? value.toFixed(decimals).replace('.', ',') : value;

export const generateId = () => "_" + Math.random().toString(36).substr(2) + Date.now();

export const arrayAvg = (arr, attr) => arr.reduce((a, b) => a + b[attr], 0) / arr.length;

export const getClosest = (array, attr, value) => {
    const diffArr = array.map(v => Math.abs(value - v[attr]));
    const closestValue = Math.min(...diffArr);
    const index = diffArr.findIndex(v => v === closestValue);
    return array[index];
};

export const importAll = r => {
    let images = {};
    r.keys().forEach(item => {
        images[item.replace('./', '')] = r(item);
    });
    return images
};

export const getLastNonEmptyRowIndex = matrix => {
    for (let i = matrix.length - 1; i >= 0; i--) {
        if (matrix[i].some(cell => cell !== null && cell !== undefined && cell !== '')) {
            return i;
        }
    }
    return -1;
}