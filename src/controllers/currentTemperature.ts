import  { Request, Response } from 'express';
import { InfluxDBService, TemperatureDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';

export const currentTemperature = (req: Request, res: Response ) => {

     const user = req.query.user;

     const instance = new InfluxDBService();

     instance.getTemperatureData(user as string, undefined, undefined, 1).then(((data: TemperatureDataResponse[]) => {

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

