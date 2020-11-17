import { NextFunction, Request, Response } from 'express';
import { InfluxDBService, Co2DataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import debug from 'debug';

export const currentCO2 = (req: Request, res: Response, next: NextFunction) => {

     const log = debug("app:controller:currentCo2")

     const user = req.query.user;

     const instance = new InfluxDBService();

     log("getting current co2 data");

     instance.getCo2Data(user as string, undefined, undefined, 1).then(((data: Co2DataResponse[]) => {
          try {

               log("receiving current co2");

               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf() / 1000).toString(),
                    value: dataItem.co2
               })));

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

