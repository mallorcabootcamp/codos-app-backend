const express = require('express');
const cors = require('cors');
import { mqttOnConnect } from './mqtt/mqttOnConnect';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/', require('./routes/prueba'));


app.listen(process.env.PORT, () => {
     mqttOnConnect();
     console.log('Conectado al puerto ' + process.env.PORT);
});

