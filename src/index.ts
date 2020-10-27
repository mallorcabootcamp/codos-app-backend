const express = require('express');
const cors = require('cors');
import { mqttOnConnect } from './mqtt/mqttOnConnect';
import { influxDbOnGet } from './influxdb/influxdb';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/', require('./routes/prueba'));


app.listen(process.env.PORT, () => {
     mqttOnConnect();
     influxDbOnGet();
     console.log('Conectado al puerto ' + process.env.PORT);
});

