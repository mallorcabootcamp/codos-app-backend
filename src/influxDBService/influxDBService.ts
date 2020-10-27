import { influxDbOnConnect } from '../influxdb/influxdb';
import { onGetCo2Data } from './functions/onGetCo2Data';
import { onGetTemperatureData } from './functions/onGetTemperatureData';
import { onGetHumidityData } from './functions/onGetHumidityData';

export class influxDBService {
    url:any;
    token:string;
    db:string;
    data:any;

    constructor(url:string, token:string, db:string){
        this.url = url;
        this.token = token;
        this.db = db;
    }

    async connect(){
        const data = await influxDbOnConnect(this.url, this.token, this.db);
        return data;
    }

    async getCo2Data(){
        const data = onGetCo2Data(await this.connect());
        return data;
    }

    async getTemperatureData(){
        const data = onGetTemperatureData(await this.connect());
        return data;

    }

    async getHumidityData(){
        const data = onGetHumidityData(await this.connect());
        return data;
    }

}