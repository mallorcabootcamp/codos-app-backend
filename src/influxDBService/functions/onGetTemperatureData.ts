export function onGetTemperatureData(data: any[]):object[] {
    const temperatureIndex = 3;
    const values: object[] = data.values.map((e:string) => { return {temperature: e[temperatureIndex]}});
    console.log(values);
    return values;
}