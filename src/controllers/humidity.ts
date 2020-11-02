import { Request, Response } from 'express';
import { InfluxDBService, HumidityDataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';

export const dataHumidity = (req: Request, res: Response ) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;

     const instance = new InfluxDBService();

     instance.getHumidityData(fromDate as string, toDate as string).then(((data: HumidityDataResponse[]) => {

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

