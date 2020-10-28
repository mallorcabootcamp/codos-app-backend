import { objectValues } from '../../influxDBService/influxDBService';

export function onGetHumidityData(data: any): objectValues[] {
    const dateIndex = 0
    const humidityIndex = 7;
    const values = data.values.map((e: objectValues[]) => { return { date: e[dateIndex], humidity: e[humidityIndex] } });
    console.log(values);
    return values;
}