import { Request, Response } from 'express';
import { InfluxDBService, Co2DataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';

export const currentCO2 = (req: Request, res: Response) => {

    const user = req.query.user;

     const instance = new InfluxDBService();

     instance.getCo2Data(user as string, undefined, undefined, 1).then(((data: Co2DataResponse[]) => {
          try {
               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem.time).valueOf()/1000).toString(),
                    value: dataItem.co2
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

