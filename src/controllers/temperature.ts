import  { Request, Response } from 'express';
import { InfluxDBService, TemperatureDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';

export const dataTemperature = (req: Request, res: Response ) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;
     const user = req.query.user;
     const aggregateTimeScale = req.query.aggregateTimeScale;
     

     const instance = new InfluxDBService();

     instance.getTemperatureData(user as string, fromDate as string, toDate as string, undefined, aggregateTimeScale as string).then(((data: TemperatureDataResponse[]) => {

          try {
               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf()/1000).toString(),
                    value: dataItem.temperature
               })));

          } catch (error) {
               console.log('ERROR: ', error);
               res.status(500).json({
                    ok: false,
                    msg: 'Error de servidor'
               });
          }
     }))
};

