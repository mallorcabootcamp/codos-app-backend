import { Request, Response, NextFunction } from 'express';
import { InfluxDBService } from '../influxDBService/influxDBService';
import moment from 'moment';

import { switchDataToGet } from '../utils/switchDataToGet';
import debug from 'debug';
//                  ##MOCK DATA##
// import mockCo2 from '../mockData/mockCurrentCo2.json';
// import * as mockHumidity from '../mockData/mockCurrentHumidity.json';
// import * as mockTemperature from '../mockData/mockCurrentTemperature.json';

const log = debug("app:controller:userCurrentData")

export const userCurrentData = (req: Request, res: Response, next: NextFunction) => {

     const user = req.query.user;
     const dataToGet = req.query.dataToGet;

     log(`getting ${dataToGet} data`);

     const instance = new InfluxDBService();

     instance.getUserCurrentData(user as string, switchDataToGet(user as string, dataToGet as string)).then(((data) => {
          try {
               log(`receiving ${dataToGet} data`);
               res.json(data.map((dataItem) => ({
                    time: Math.round(moment(dataItem[0]).valueOf() / 1000).toString(),
                    value: dataItem[1]
               })));

               //                  ##MOCK DATA##
               // if (dataToGet === 'co2') res.json(mockCo2);
               // else if (dataToGet === 'temperature') res.json(mockHumidity);
               // else if (dataToGet === 'humidity') res.json(mockTemperature);

               log("exit controller");
          } catch (error) {
               log("ERROR: ", error);
               res.status(500).json({
                    ok: false,
                    msg: 'Error de servidor'
               });
          }
          next();
     }))
};



