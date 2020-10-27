const express = require('express');
const cors = require('cors');
import { mqttOnConnect } from './mqtt/mqttOnConnect';
import { influxDBService } from './influxDBService/influxDBService';
require('dotenv').config();

const url: any = process.env.INFLUX_URL;
const token: any = process.env.INFLUX_TOKEN;
const db: any = process.env.INFLUX_DB;

const app = express();

app.use(cors());
app.use(express.json());


app.use('/', require('./routes/prueba'));


app.listen(process.env.PORT, () => {
     const onConnect = new influxDBService(url, token, db);
     onConnect.connect();
     onConnect.getCo2Data();
     mqttOnConnect();
     console.log('Conectado al puerto ' + process.env.PORT);
});

