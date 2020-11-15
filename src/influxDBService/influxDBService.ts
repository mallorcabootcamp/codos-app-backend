import axios from 'axios';
import { InfluxDbApiResponse } from './InfluxDbApiResponse';

const url: string | undefined = process.env.INFLUX_URL;
const token: string | undefined = process.env.INFLUX_TOKEN;
const db: string | undefined = process.env.INFLUX_DB;


export interface DataResponse {
    time: string,
    co2: number,
    rh: number,
    temperature: number
}

export interface Co2DataResponse {
    time: string;
    co2: number;
}

export interface TemperatureDataResponse {
    time: string;
    temperature: number;
}

export interface HumidityDataResponse {
    time: string;
    humidity: number;
}

export class InfluxDBService {

    constructor() { }

    async getCo2Data(user: string, fromDate?: string, toDate?: string, limit?: number, aggregateTimeScale?: string): Promise<Co2DataResponse[]> {
        return this.getData(user, fromDate, toDate, limit, aggregateTimeScale).then((data: DataResponse[]) => data.map(({ time, co2 }: DataResponse) => ({ time, co2 })));
    }

    async getTemperatureData(user: string, fromDate?: string, toDate?: string, limit?: number, aggregateTimeScale?: string): Promise<TemperatureDataResponse[]> {
        return this.getData(user, fromDate, toDate, limit, aggregateTimeScale).then((data: DataResponse[]) => data.map(({ time, temperature }: DataResponse) => ({ time, temperature })));
    }

    async getHumidityData(user: string, fromDate?: string, toDate?: string, limit?: number, aggregateTimeScale?: string): Promise<HumidityDataResponse[]> {
        return this.getData(user, fromDate, toDate, limit, aggregateTimeScale).then((data: DataResponse[]) => data.map(({ time, rh }: DataResponse) => ({ time, humidity: rh })));
    }

    private getData(user: string, fromDate?: string, toDate?: string, limit?: number, aggregateTimeScale?: string): Promise<DataResponse[]> {
        console.log(user);
        return axios({
            method: 'GET',
            url: url,
            timeout: 1000,
            params: {
                q: getQuery(user, fromDate, toDate, limit, aggregateTimeScale),
                db: db
            },
            headers: { 'Authorization': token }
        }).then(response => {
            if(!response.data.results[0].series) {
                return [];
            } else {
                const columns = (response.data as InfluxDbApiResponse).results[0].series[0].columns
                return (response.data as InfluxDbApiResponse).results[0].series[0].values.map(value => {
                    return value.reduce((acc, val, idx) => {
                        acc[columns[idx]] = val;
                        return acc;
                    }, {})
                })
            }
        }).then((data: any[]) => {
            return data.map((dataItem: any) => ({
                time: dataItem.time,
                co2: 'eCO2[ppm]' in dataItem ? dataItem['eCO2[ppm]'] : dataItem['mean_eCO2[ppm]'],
                rh: 'rH[o/o]' in dataItem ? dataItem['rH[o/o]'] : dataItem['mean_rH[o/o]'],
                temperature: 'T[°C]' in dataItem ? dataItem['T[°C]'] : dataItem['mean_T[°C]']
            }))
        })
    }

}

const getQuery = (user: string, fromDate?: string, toDate?: string, limit?: number, aggregateTimeScale?: string) => {
    const getRangeOfData = `SELECT MEAN(*) FROM "${user}" where time >=${fromDate}s and time <${toDate}s group by time(${aggregateTimeScale}) ORDER BY "time" DESC`;
    const getCurrentData = `SELECT * FROM "${user}" ORDER BY "time" DESC LIMIT ${limit}`;
    return (fromDate && toDate) ? getRangeOfData : getCurrentData;
}