export function onGetTemperatureData(data: any[]):object[] {
    const dateIndex = 0
    const temperatureIndex = 3;
    const values: object[] = data.values.map((e:string) => { return {date: e[dateIndex],temperature: e[temperatureIndex]}});
    console.log(values);
    return values;
}