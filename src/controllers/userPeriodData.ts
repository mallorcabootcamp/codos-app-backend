import { Request, Response, NextFunction } from 'express';
import { InfluxDBService } from '../influxDBService/influxDBService';
import moment from 'moment';
import { switchDataToGet } from '../utils/switchDataToGet';
import debug from 'debug';
//                  ##MOCK DATA##
// const mockCo2 = require('../mockData/mockPeriodCo2.json')
// const mockHumidity = require('../mockData/mockPeriodHumidity.json')
// const mockTemperature = require('../mockData/mockPeriodTemperature.json')

const log = debug("app:controller:userPeriodData")

export const userPeriodData = (req: Request, res: Response, next: NextFunction) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;
     const user = req.query.user;
     const aggregateTimeScale = req.query.aggregateTimeScale;
     const dataToGet = req.query.dataToGet;

     log(`getting ${dataToGet} data`);

     const instance = new InfluxDBService();

     instance.getUserPeriodData(user as string, fromDate as string, toDate as string, aggregateTimeScale as string, switchDataToGet(user as string, dataToGet as string)).then(((data) => {
          try {
               log(`receiving ${dataToGet} data`);

               res.json(data.map((dataItem) => ({
                    time: Math.round(moment(dataItem[0]).valueOf() / 1000).toString(),
                    value: dataItem[1]
               })));
               //                  ##MOCK DATA##
               // if (dataToGet === 'co2') res.json(mockCo2);
               // else if (dataToGet === 'temperature') res.json(mockTemperature);
               // else if (dataToGet === 'humidity') res.json(mockHumidity);
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

