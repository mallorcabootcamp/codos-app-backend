 
export function onGetCo2Data(data:any) {
    const values = data.values.map((e:any) => { return {eCo2: e[5]}});
    console.log(values);
    return values;
}