import { Request, Response } from 'express';
import { InfluxDBService, dataResponse } from '../influxDBService/influxDBService';
import moment from 'moment';
import { switchDataToGet } from '../utils/switchDataToGet';

export const userPeriodData = (req: Request, res: Response) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;
     const user = req.query.user;
     const aggregateTimeScale = req.query.aggregateTimeScale;
     const dataToGet = req.query.dataToGet;


     const instance = new InfluxDBService();

     instance.getUserPeriodData(user as string, fromDate as string, toDate as string, aggregateTimeScale as string, switchDataToGet(user as string, dataToGet as string)).then(((data: dataResponse[]):void => {
          try {
               res.json(data.map((dataItem: any): dataResponse => ({
                    time: Math.round(moment(dataItem[0]).valueOf() / 1000).toString(),
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

