 
export function onGetCo2Data(data:any) {
    const eCoIndex = 5;
    const values = data.values.map((e:any) => { return {eCo2: e[eCoIndex]}});
    return values;
}