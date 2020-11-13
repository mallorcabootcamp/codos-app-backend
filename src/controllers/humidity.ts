import { NextFunction, Request, Response } from 'express';
import { InfluxDBService, HumidityDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import debug from 'debug';

export const dataHumidity = (req: Request, res: Response, next: NextFunction ) => {

     const log = debug("app:controller:humidity")

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;
     const user = req.query.user;

     const instance = new InfluxDBService();

     log("getting humidity data");

     instance.getHumidityData(user as string, fromDate as string, toDate as string).then(((data: HumidityDataResponse[]) => {

          try {

               log("receiving humidity data");

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

