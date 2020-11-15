import { Request, Response, NextFunction } from 'express';


export const validationParamsData = (req: Request, res: Response, next: NextFunction) => {

     if(!req.query.fromDate || !req.query.toDate || !req.query.user || !req.query.aggregateTimeScale || !req.query.dataToGet) {
          return res.status(403).json({
               msg: "Los parámetros 'fromDate, 'toDate', 'user', 'aggregateTimeScale' y 'dataToGet' son requeridos"
          });
     }
     next();

}

export const validationParamsCurrent = (req: Request, res: Response, next: NextFunction) => {

     if( !req.query.user || !req.query.dataToGet) {
          return res.status(403).json({
               msg: "El parámetro 'user' y 'dataToGet' es requerido"
          });
     }
     next();

}