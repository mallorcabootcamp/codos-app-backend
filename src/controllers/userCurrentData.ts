import { Request, Response, NextFunction } from 'express';
import { InfluxDBService } from '../influxDBService/influxDBService';
import moment from 'moment';
import { switchDataToGet } from '../utils/switchDataToGet';
import debug from 'debug';

const log = debug("app:controller:userCurrentData")
const mockData = process.env['MOCK_DATA'];

export const userCurrentData = (req: Request, res: Response, next: NextFunction) => {
     const user = req.query.user;
     const dataToGet = req.query.dataToGet;

     log(`getting ${dataToGet} data`);

     if (mockData === 'true') {
          const mockCo2 = require('../mockData/mockCurrentCo2.json');
          const mockHumidity = require('../mockData/mockCurrentHumidity.json');
          const mockTemperature = require('../mockData/mockCurrentTemperature.json');
          if (dataToGet === 'co2') res.json(mockCo2);
          else if (dataToGet === 'temperature') res.json(mockHumidity);
          else if (dataToGet === 'humidity') res.json(mockTemperature);
     } else {
          const instance = new InfluxDBService();

          instance.getUserCurrentData(user as string, switchDataToGet(user as string, dataToGet as string)).then(((data) => {
               try {
                    log(`receiving ${dataToGet} data`);

                    res.json(data.map((dataItem) => ({
                         time: Math.round(moment(dataItem[0]).valueOf() / 1000).toString(),
                         value: dataItem[1]
                    })));

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
     }
};



