import  { NextFunction, Request, Response } from 'express';
import { InfluxDBService, TemperatureDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import debug from 'debug';

export const currentTemperature = (req: Request, res: Response, next: NextFunction ) => {

     const log = debug("app:controller:currentTemperature")

     const user = req.query.user;

     const instance = new InfluxDBService();

     log("getting current Temperature data");

     instance.getTemperatureData(user as string, undefined, undefined, 1).then(((data: TemperatureDataResponse[]) => {

          try {

               log("receiving current temperature");

               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf()/1000).toString(),
                    value: dataItem.temperature
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

