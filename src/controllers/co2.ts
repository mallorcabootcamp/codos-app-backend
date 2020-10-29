import { Request, Response } from 'express';
import { InfluxDBService } from '../influxDBService/influxDBService';

const url: string | undefined = process.env.INFLUX_URL;
const token: string | undefined = process.env.INFLUX_TOKEN;
const db: string | undefined = process.env.INFLUX_DB;
const user: string = '"@erguro1973"';

export const dataCO2 = (req: Request, res: Response) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;

     const instance = new InfluxDBService(url as string, token as string, db as string, user as string);

     instance.getCo2Data().then((data => {
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

