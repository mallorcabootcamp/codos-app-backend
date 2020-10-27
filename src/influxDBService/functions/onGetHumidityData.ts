export function onGetHumidityData(data:any) {
    const values = data.values.map((e:any) => { return {humidity: e[7]}});
    console.log(values);
    return values;
}