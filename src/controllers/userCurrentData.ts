import { Request, Response } from 'express';
import { InfluxDBService, dataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';

export const userCurrentData = (req: Request, res: Response) => {

    const user = req.query.user;
    const dataToGet = req.query.dataToGet;

     const instance = new InfluxDBService();

     instance.getUserCurrentData(user as string, dataToGet as string).then(((data: dataResponse[]) => {
          try {
               res.json(data.map((dataItem: any) => ({
                    time: Math.round(moment(dataItem[0]).valueOf()/1000).toString(),
                    value: dataItem[1]
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

