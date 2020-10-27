export function onGetHumidityData(data:any) {
    const humidityIndex = 7;
    const values = data.values.map((e:any) => { return {humidity: e[humidityIndex]}});
    console.log(values);
    return values;
}