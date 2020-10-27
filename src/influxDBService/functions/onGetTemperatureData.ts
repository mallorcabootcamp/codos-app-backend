export function onGetTemperatureData(data:any) {
    const temperatureIndex = 3;
    const values = data.values.map((e:any) => { return {temperature: e[temperatureIndex]}});
    console.log(values);
    return values;
}