require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { mqttOnConnect } from './mqtt/mqttOnConnect';
import { router } from './router';
import debug from 'debug';

const log = debug("app:index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(process.env.PORT, () => {
     mqttOnConnect();
     log('Conectado al puerto ' + process.env.PORT);
});

/* 
process.on("beforeExit", () => {
     log("exit backend");
})*/