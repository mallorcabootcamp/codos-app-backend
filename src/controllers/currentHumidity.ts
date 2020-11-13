import { NextFunction, Request, Response } from 'express';
import { InfluxDBService, HumidityDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import debug from 'debug';

export const currentHumidity = (req: Request, res: Response, next: NextFunction ) => {

     const log = debug("app:controller:currentHumidity")

     const user = req.query.user;

     const instance = new InfluxDBService();

     log("getting current humidity data");

     instance.getHumidityData(user as string, undefined, undefined, 1).then(((data: HumidityDataResponse[]) => {

          try {

               log("receiving current humidity");

               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf()/1000).toString(),
                    value: dataItem.humidity
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

