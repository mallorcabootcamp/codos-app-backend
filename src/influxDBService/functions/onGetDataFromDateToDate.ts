import { objectValues } from '../../influxDBService/influxDBService';

export function onGetDataFromDateToDate(dataFrom:objectValues, dataTo:objectValues, value:objectValues[]): objectValues[] {
    const values = value.filter((e:objectValues) => e.date >= dataFrom.date && e.date <= dataTo.date);
    console.log(values);
    return values;
}