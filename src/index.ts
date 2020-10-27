require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { mqttOnConnect } from './mqtt/mqttOnConnect';
import { router } from './router';

const app = express();

app.use(cors());
app.use(express.json());


app.use(router);


app.listen(process.env.PORT, () => {
     mqttOnConnect();
     console.log('Conectado al puerto ' + process.env.PORT);
});

