
import axios from 'axios';
import { InfluxDbApiResponse } from './InfluxDbApiResponse';

const url: string | undefined = process.env.INFLUX_URL;
const token: string | undefined = process.env.INFLUX_TOKEN;
const db: string | undefined = process.env.INFLUX_DB;
const user: string = '"@erguro1973"';


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

    async getCo2Data(fromDate?: string, toDate?: string): Promise<Co2DataResponse[]> {
        return this.getData().then((data: DataResponse[]) => data.map(({ time, co2 }: DataResponse) => ({ time, co2 })));
    }

    async getTemperatureData(fromDate: string, toDate: string): Promise<TemperatureDataResponse[]> {
        return this.getData().then((data: DataResponse[]) => data.map(({ time, temperature }: DataResponse) => ({ time, temperature })));
    }

    async getHumidityData(fromDate: string, toDate: string): Promise<HumidityDataResponse[]> {
        return this.getData().then((data: DataResponse[]) => data.map(({ time, rh }: DataResponse) => ({ time, humidity: rh })));
    }

    private getData(): Promise<DataResponse[]> {
        return axios({
            method: 'GET',
            url: url,
            timeout: 1000,
            params: {
                q: `SELECT * FROM ${user} LIMIT 20`,
                db: db
            },
            headers: { 'Authorization': token }
        }).then(response => {
            const columns = (response.data as InfluxDbApiResponse).results[0].series[0].columns
            return (response.data as InfluxDbApiResponse).results[0].series[0].values.map(value => {
                return value.reduce((acc, val, idx) => {
                    acc[columns[idx]] = val;
                    return acc;
                }, {})
            })
        }).then((data: any[]) => {
            return data.map((dataItem: any) => ({
                time: dataItem.time,
                co2: dataItem['eCO2[ppm]'],
                rh: dataItem['rH[o/o]'],
                temperature: dataItem['T[°C]']
            }))
        })
    }

}