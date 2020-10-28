export function onGetHumidityData(data:any) {
    const dateIndex = 0
    const humidityIndex = 7;
    const values = data.values.map((e:any) => { return {date: e[dateIndex],humidity: e[humidityIndex]}});
    console.log(values);
    return values;
}