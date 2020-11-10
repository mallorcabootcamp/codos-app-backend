
import axios from 'axios';
import { InfluxDbApiResponse } from './InfluxDbApiResponse';
import moment from 'moment';

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

    async getCo2Data(user: string, fromDate?: string, toDate?: string, limit?: number): Promise<Co2DataResponse[]> {
        return this.getData(user, fromDate, toDate, limit).then((data: DataResponse[]) => data.map(({ time, co2 }: DataResponse) => ({ time, co2 })));
    }

    async getTemperatureData(user: string, fromDate?: string, toDate?: string, limit?: number): Promise<TemperatureDataResponse[]> {
        return this.getData(user, fromDate, toDate, limit).then((data: DataResponse[]) => data.map(({ time, temperature }: DataResponse) => ({ time, temperature })));
    }

    async getHumidityData(user: string, fromDate?: string, toDate?: string, limit?: number): Promise<HumidityDataResponse[]> {
        return this.getData(user, fromDate, toDate, limit).then((data: DataResponse[]) => data.map(({ time, rh }: DataResponse) => ({ time, humidity: rh })));
    }

    private getData(user: string, fromDate?: string, toDate?: string, limit?: number): Promise<DataResponse[]> {
        console.log(user);
        return axios({
            method: 'GET',
            url: url,
            timeout: 1000,
            params: {
                q: getQuery(user, fromDate, toDate, limit),
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
                co2: dataItem['mean_eCO2[ppm]'],
                rh: dataItem['mean_rH[o/o]'],
                temperature: dataItem['mean_T[°C]']
            }))
        })
    }

}

const getQuery = (user: string, fromDate?: string, toDate?: string, limit?: number) => {
    let query = `SELECT MEAN(*) FROM "${user}"`;
    if(fromDate && toDate) {
        const timeRecivedDiference = parseInt(toDate) - parseInt(fromDate);
        const threeDaysDiference = moment().valueOf()/1000 - moment().subtract(3, 'days').valueOf()/1000;
        const timeScaleValue = timeRecivedDiference < threeDaysDiference ? "60m" : "1d";
        query += ` where time >=${fromDate}s and time <${toDate}s group by time(${timeScaleValue}) ORDER BY "time" DESC`;
    }
    if(limit) {
        query += ` ORDER BY "time" DESC LIMIT ${limit}`;
    }
    return query;
}