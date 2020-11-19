import axios from 'axios';
import { InfluxDbApiResponse } from './InfluxDbApiResponse';
import debug from 'debug';


const url: string | undefined = process.env.INFLUX_URL;
const token: string | undefined = process.env.INFLUX_TOKEN;
const db: string | undefined = process.env.INFLUX_DB;
const mockData = process.env.MOCK_DATA;

const log = debug("app:influxDBService")
export class InfluxDBService {
    constructor() { }

    async getUserPeriodData(user: string, fromDate: string, toDate: string, aggregateTimeScale: string, dataToGet: string): Promise<[string, number][]> {
        return this.makeInfluxDbRequest(getQueryPeriodData(user, fromDate, toDate, aggregateTimeScale, dataToGet))
    }

    async getUserCurrentData(user: string, dataToGet: string): Promise<[string, number][]> {
        return this.makeInfluxDbRequest(getQueryCurrentData(user, dataToGet))
    }

    async getUsers(): Promise<string[]> {
        return this.makeInfluxDbRequest(getQueryUsers());
    }


    private makeInfluxDbRequest(query: string) {
        log("getting influxDB data");
        return axios({
            method: 'GET',
            url: url,
            params: {
                q: query,
                db: db
            },
            headers: { 'Authorization': token }
        }).then(response => {
            log("returning influxDB data");
            if (!response.data.results[0].series) {
                return [];
            } else {
                return (response.data as InfluxDbApiResponse).results[0].series[0].values
            }
        }).catch(error => error);
    }
}

const getQueryPeriodData = (user: string, fromDate: string, toDate: string, aggregateTimeScale: string, dataToGet: string) => {
    return `SELECT MEAN("${dataToGet}") FROM "${user}" where time >=${fromDate}s and time <${toDate}s group by time(${aggregateTimeScale}) ORDER BY "time" DESC`;
}

const getQueryCurrentData = (user: string, dataToGet: string) => {
    log("builging query for param 'q'");
    return `SELECT LAST("${dataToGet}") FROM "${user}"`;
}

const getQueryUsers = () => {
    log("builging query for param 'q'");
    return 'SHOW MEASUREMENTS';
}


