import { InfluxDBService } from '../influxDBService/influxDBService';
import { NextFunction, Request, Response } from 'express';
import debug from 'debug';


const log = debug("app:controller:users");
const mockData = process.env['MOCK_DATA'];

export const users = (req: Request, res: Response, next: NextFunction) => {

     log("getting users data");

     if (mockData === 'true') {
          const mockUser = require('../mockData/mockUser.json')
          res.json(mockUser);
     } else {

          const instance = new InfluxDBService();

          instance.getUsers().then(((data): void => {
               try {
                    log(`receiving users data`);

                    res.json(new Array().concat(...data))

                    log("exit controller");
               } catch (error) {
                    log('ERROR: ', error);
                    res.status(500).json({
                         ok: false,
                         msg: 'Error de servidor'
                    });
               }
               next();
          }))
     }
}


