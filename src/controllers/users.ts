import { InfluxDBService } from '../influxDBService/influxDBService';
import { NextFunction, Request, Response } from 'express';
import debug from 'debug';
//                  ##MOCK DATA##
// const mockUser = require('../mockData/mockUser.json')

const log = debug("app:controller:users");

export const users = (req: Request, res: Response, next: NextFunction) => {

     log("getting users data");

     const instance = new InfluxDBService();

     instance.getUsers().then(((data): void => {
          try {
               log(`receiving users data`);

               res.json(new Array().concat(...data))

               //                  ##MOCK DATA##
               // res.json(mockUser)

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


