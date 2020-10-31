require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { mqttOnConnect } from './mqtt/mqttOnConnect';
import { influxDBService } from './influxDBService/influxDBService';
import { router } from './router';

const url: any = process.env.INFLUX_URL;
const token: any = process.env.INFLUX_TOKEN;
const db: any = process.env.INFLUX_DB;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
     mqttOnConnect();
     console.log('Conectado al puerto ' + process.env.PORT);
});