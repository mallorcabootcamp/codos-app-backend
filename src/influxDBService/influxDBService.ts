import { influxDbOnConnect } from '../influxdb/influxdb';
import { onGetCo2Data } from './functions/onGetCo2Data';
import { onGetTemperatureData } from './functions/onGetTemperatureData';
import { onGetHumidityData } from './functions/onGetHumidityData';
import { onGetDataFromDateToDate } from './functions/onGetDataFromDateToDate';
import { config } from 'dotenv';
config();

const url: any = process.env.INFLUX_URL;
const token: any = process.env.INFLUX_TOKEN;
const db: any = process.env.INFLUX_DB;

interface objectValues {

    date: string,
    eCo2: number

}

export class influxDBService {
    private static instance: influxDBService;
    private url: any;
    private token: any;
    private db: any;
    private data: any;

    private constructor() {
    }

    static getInstance() {
        if (!influxDBService.instance) {
            influxDBService.instance = new influxDBService();
            influxDBService.instance.url = url;
            influxDBService.instance.token = token;
            influxDBService.instance.db = db;
        }
        return influxDBService.instance;
    }

    async connect() {
        const data = await influxDbOnConnect(this.url, this.token, this.db);
        this.data = data;
    }

    getCo2Data() {
        const data = onGetCo2Data(this.data);
        return data;
    }

    getTemperatureData() {
        const data = onGetTemperatureData(this.data);
        return data;

    }

    getHumidityData() {
        const data = onGetHumidityData(this.data);
        return data;
    }

    getDataFromDateToDate(dataFrom: objectValues, dataTo: objectValues, value: objectValues[]) {
        const data = onGetDataFromDateToDate(dataFrom, dataTo, value);
        return data;
    }

}