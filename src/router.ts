import { Router } from 'express';
import { userPeriodData } from './controllers/userPeriodData';
import { userCurrentData } from './controllers/userCurrentData';
import { validationParamsData, validationParamsCurrent } from './middelwares/validation';
import { users } from './controllers/users';

export const router = Router();

router.get( '/period/data', validationParamsData, userPeriodData );
router.get( '/current/data', validationParamsCurrent, userCurrentData );
router.get('/users', users);
