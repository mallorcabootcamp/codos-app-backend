import { influxDbOnConnect } from '../influxdb/influxdb';
import { onGetCo2Data } from './functions/onGetCo2Data';
import { onGetTemperatureData } from './functions/onGetTemperatureData';
import { onGetHumidityData } from './functions/onGetHumidityData';
import { onGetDataFromDateToDate } from './functions/onGetDataFromDateToDate';
import { config } from 'dotenv';
config();

const url: string | undefined = process.env.INFLUX_URL;
const token: string | undefined = process.env.INFLUX_TOKEN;
const db: string | undefined = process.env.INFLUX_DB;
const user: string = '"@erguro1973"';

export interface objectValues {
    date: string,
    eCo2?: number,
    temperature?:number,
    humidity?:number
}

export class influxDBService {
    private static instance: influxDBService;
    private url: any;
    private token: any;
    private db: any;
    private user: any;
    private data: any;
    

    private constructor() {
    }

    static getInstance() {
        if (!influxDBService.instance) {
            influxDBService.instance = new influxDBService();
            influxDBService.instance.url = url;
            influxDBService.instance.token = token;
            influxDBService.instance.db = db;
            influxDBService.instance.user = user;
        }
        return influxDBService.instance;
    }

    async connect() {
        const data = await influxDbOnConnect(this.url, this.token, this.db, this.user);
        this.data = data;
    }

    getCo2Data(): objectValues[] {
        return onGetCo2Data(this.data);
    }

    getTemperatureData(): objectValues[] {
        return onGetTemperatureData(this.data);
    }

    getHumidityData():objectValues[] {
        return onGetHumidityData(this.data);
    }

    getDataFromDateToDate(dataFrom:objectValues, dataTo: objectValues, value: objectValues[]):objectValues[] {
        return onGetDataFromDateToDate(dataFrom, dataTo, value);
    }

}