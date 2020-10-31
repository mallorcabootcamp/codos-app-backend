import { influxDbOnConnect } from '../influxdb/influxdb';
import { onGetCo2Data } from './functions/onGetCo2Data';
import { onGetTemperatureData } from './functions/onGetTemperatureData';
import { onGetHumidityData } from './functions/onGetHumidityData';
import { onGetDataFromDateToDate } from './functions/onGetDataFromDateToDate';
import axios from 'axios';
import { InfluxDbApiResponse } from './InfluxDbApiResponse';

export interface DataResponse {
    time: string,
    Sensor: number,
    TV?: number,
    humidity?: number
}

export class InfluxDBService {

    constructor(
        private url: string,
        private token: string,
        private db: string,
        private user: string
    ) { }

    async getCo2Data(fromDate?: string, toDate?: string): any {
        const data = await this.getData();
        let a = data;
        debugger;
        // return only co2 data
    }

    async getTemperatureData(fromDate: string, toDate: string): ObjectValues[] {
        const data = await this.getData();
        let a = data;
        // return only temp data
    }

    async getHumidityData(fromDate: string, toDate: string): ObjectValues[] {
        const data = await this.getData();
        let a = data;
        // return only hum data
    }

    private getData() {
        return axios({
            method: 'GET',
            url: this.url,
            timeout: 1000,
            params: {
                q: `SELECT * FROM ${this.user} LIMIT 20`,
                db: this.db
            },
            headers: { 'Authorization': this.token }
        }).then(response => {
            const columns = (response.data as InfluxDbApiResponse).results[0].series[0].columns
            return (response.data as InfluxDbApiResponse).results[0].series[0].values.map(value => {
                return value.reduce((acc, val, idx) => {
                    acc[columns[idx]] = val;
                    return acc;
                }, {})
            })
        })
    }

}