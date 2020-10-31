import { Request, Response } from 'express';
import { InfluxDBService, Co2DataResponse } from '../influxDBService/influxDBService';


export const dataCO2 = (req: Request, res: Response) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;

     const instance = new InfluxDBService();

     instance.getCo2Data(fromDate as string, toDate as string).then(((data: Co2DataResponse[]) => {
          try {
               res.json({
                    ok: true,
                    msg: 'Hola mundo desde CO2',
                    data: data
               });

          } catch (error) {
               console.log('ERROR: ', error);
               res.status(500).json({
                    ok: false,
                    msg: 'Error de servidor'
               });
          }
     }))
};

