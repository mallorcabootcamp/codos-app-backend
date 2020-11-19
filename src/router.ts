import { Router } from 'express';
import { userPeriodData } from './controllers/userPeriodData';
import { userCurrentData } from './controllers/userCurrentData';
import { validationParamsData, validationParamsCurrent } from './middelwares/validation';
import { users } from './controllers/users';
import debug from 'debug';

const log = debug("app:router")

const endRoute = () => {
     log("leaving the route");
}

export const router = Router();

router.get('/data/period', validationParamsData, userPeriodData, endRoute);
router.get('/data/current', validationParamsCurrent, userCurrentData, endRoute);
router.get('/users', users, endRoute);

