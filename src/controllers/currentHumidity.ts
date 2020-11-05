import { Request, Response } from 'express';
import { InfluxDBService, HumidityDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';

export const currentHumidity = (req: Request, res: Response ) => {

     const user = req.query.user;

     const instance = new InfluxDBService();

     instance.getHumidityData(user as string, undefined, undefined, 1).then(((data: HumidityDataResponse[]) => {

          try {
               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf()/1000).toString(),
                    value: dataItem.humidity
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

