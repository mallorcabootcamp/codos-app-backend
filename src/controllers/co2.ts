import { Request, Response, NextFunction } from 'express';
import { InfluxDBService, Co2DataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import debug from 'debug';

export const dataCO2 = (req: Request, res: Response, next: NextFunction) => {

     const log = debug("app:controller:co2")

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;
     const user = req.query.user;

     const instance = new InfluxDBService();
     
     log("getting co2 data");

     instance.getCo2Data(user as string, fromDate as string, toDate as string).then(((data: Co2DataResponse[]) => {
          try {

               log("receiving co2 data");
               
               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf()/1000).toString(),
                    value: dataItem.co2
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

};

