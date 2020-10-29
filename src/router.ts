
import { Router } from 'express';

import { dataCO2 } from './controllers/co2';
import { dataTemperature } from './controllers/temperature';
import { dataHumidity } from './controllers/humidity';

export const router = Router();

router.get( '/data/co2', dataCO2 );
router.get( '/data/temperature', dataTemperature);
router.get( '/data/humidity', dataHumidity);


