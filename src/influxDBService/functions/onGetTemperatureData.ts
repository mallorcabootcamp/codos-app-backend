import { objectValues } from '../../influxDBService/influxDBService';

export function onGetTemperatureData(data: any): objectValues[] {
    const dateIndex = 0
    const temperatureIndex = 3;
    const values = data.values.map((e:objectValues[]) => { return {date: e[dateIndex],temperature: e[temperatureIndex]}});
    console.log(values);
    return values;
}