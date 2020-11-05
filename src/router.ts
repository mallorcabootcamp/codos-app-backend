
import { Router } from 'express';

import { dataCO2 } from './controllers/co2';
import { dataTemperature } from './controllers/temperature';
import { dataHumidity } from './controllers/humidity';

import { currentCO2 } from './controllers/currentCo2';
import { currentTemperature } from './controllers/currentTemperature';
import { currentHumidity } from './controllers/currentHumidity';
import { validationParamsData, validationParamsCurrent } from './middelwares/validation';

export const router = Router();

router.get( '/data/co2', validationParamsData, dataCO2 );
router.get( '/data/temperature', validationParamsData, dataTemperature);
router.get( '/data/humidity', validationParamsData, dataHumidity);

router.get( '/current/co2', validationParamsCurrent, currentCO2 );
router.get( '/current/temperature', validationParamsCurrent,  currentTemperature);
router.get( '/current/humidity', validationParamsCurrent, currentHumidity);
