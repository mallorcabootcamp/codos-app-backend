
import { Router } from 'express';

import { dataCO2 } from './controllers/co2';
import { dataTemperature } from './controllers/temperature';
import { dataHumidity } from './controllers/humidity';

import { currentCO2 } from './controllers/currentCo2';
import { currentTemperature } from './controllers/currentTemperature';
import { currentHumidity } from './controllers/currentHumidity';
import { validationParamsData, validationParamsCurrent } from './middelwares/validation';
import { users } from './controllers/users';
import debug from 'debug';

const log = debug("app:router")

const endRoute = () => {
     log("leaving the route");
}

export const router = Router();

router.get( '/data/co2', validationParamsData, dataCO2, endRoute);

router.get( '/data/temperature', validationParamsData, dataTemperature, endRoute);
router.get( '/data/humidity', validationParamsData, dataHumidity, endRoute);

router.get( '/current/co2', validationParamsCurrent, currentCO2, endRoute );
router.get( '/current/temperature', validationParamsCurrent,  currentTemperature, endRoute);
router.get( '/current/humidity', validationParamsCurrent, currentHumidity, endRoute);

router.get('/users', users, endRoute);

