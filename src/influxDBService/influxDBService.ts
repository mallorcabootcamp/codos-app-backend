import { influxDbOnConnect } from '../influxdb/influxdb';
import { onGetCo2Data } from './functions/onGetCo2Data';
import { onGetTemperatureData } from './functions/onGetTemperatureData';
import { onGetHumidityData } from './functions/onGetHumidityData';
import { onGetDataFromDateToDate } from './functions/onGetDataFromDateToDate';

interface objectValues{

    date:string,
    eCo2:number

}

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
        this.data = data;
    }

    getCo2Data(){
        const data = onGetCo2Data(this.data);
        return data;
    }

    getTemperatureData(){
        const data = onGetTemperatureData(this.data);
        return data;

    }

    getHumidityData(){
        const data = onGetHumidityData(this.data);
        return data;
    }

    getDataFromDateToDate(dataFrom: objectValues, dataTo: objectValues, value:objectValues[]){
        const data = onGetDataFromDateToDate(dataFrom, dataTo, value);
    }

}