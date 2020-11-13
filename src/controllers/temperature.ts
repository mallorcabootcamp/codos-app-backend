import  { NextFunction, Request, Response } from 'express';
import { InfluxDBService, TemperatureDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import debug from 'debug';

export const dataTemperature = (req: Request, res: Response, next: NextFunction ) => {

     const log = debug("app:controller:temperature")

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;
     const user = req.query.user;

     const instance = new InfluxDBService();

     log("getting temperature data");

     instance.getTemperatureData(user as string, fromDate as string, toDate as string).then(((data: TemperatureDataResponse[]) => {

          try {

               log("receiving temperature data");

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

