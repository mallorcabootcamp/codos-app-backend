export function onGetTemperatureData(data:any) {

    const values = data.values.map((e:any) => { return {temperature: e[3]}});
    console.log(values);
    return values;
}