import axios from 'axios';
import { InfluxDbApiResponse } from './InfluxDbApiResponse';

const url: string | undefined = process.env.INFLUX_URL;
const token: string | undefined = process.env.INFLUX_TOKEN;
const db: string | undefined = process.env.INFLUX_DB;

export interface dataResponse {
    time: string;
    value: number;
}

export class InfluxDBService {
    constructor() { }

    async getUserPeriodData(user: string, fromDate: string, toDate: string, aggregateTimeScale: string, dataToGet: string): Promise<dataResponse[]> {
        return this.makeInfluxDbRequest(getQueryPeriodData(user, fromDate, toDate, aggregateTimeScale, dataToGet))
    }

    async getUserCurrentData(user: string, dataToGet: string): Promise<dataResponse[]> {
        return this.makeInfluxDbRequest(getQueryCurrentData(user, dataToGet))
    }

    async getUsers() {
        return this.makeInfluxDbRequest(getQueryUsers());
    }

    private makeInfluxDbRequest(query: string) {
        return axios({
            method: 'GET',
            url: url,
            params: {
                q: query,
                db: db
            },
            headers: { 'Authorization': token }
        }).then(response => {
            if (!response.data.results[0].series) {
                return [];
            } else {
                return (response.data as InfluxDbApiResponse).results[0].series[0].values
            }
        }, (err) => err)
    }
}

const getQueryPeriodData = (user: string, fromDate: string, toDate: string, aggregateTimeScale: string, dataToGet: string) => {
    return `SELECT MEAN("${dataToGet}") FROM "${user}" where time >=${fromDate}s and time <${toDate}s group by time(${aggregateTimeScale}) ORDER BY "time" DESC`;
}

const getQueryCurrentData = (user: string, dataToGet: string) => {
    return `SELECT LAST("${dataToGet}") FROM "${user}"`;
}

const getQueryUsers = () => {
    return 'SHOW MEASUREMENTS';
}
