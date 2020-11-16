import { Router } from 'express';
import { userPeriodData } from './controllers/userPeriodData';
import { userCurrentData } from './controllers/userCurrentData';
import { validationParamsData, validationParamsCurrent } from './middelwares/validation';
import { users } from './controllers/users';

export const router = Router();

router.get( '/data/period', validationParamsData, userPeriodData );
router.get( '/data/current', validationParamsCurrent, userCurrentData );
router.get('/users', users);
