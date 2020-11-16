import { Request, Response } from 'express';
import { InfluxDBService } from '../influxDBService/influxDBService';


export const users = (req: Request, res: Response) => {

     const instance = new InfluxDBService();

     instance.getUsers().then(((data: any): void => {
          try {
               res.json(new Array().concat(...data))

          } catch (error) {
               console.log('ERROR: ', error);
               res.status(500).json({
                    ok: false,
                    msg: 'Error de servidor'
               });
          }

     }))
}

