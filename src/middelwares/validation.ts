import { Request, Response, NextFunction } from 'express';


export const validationParamsData = (req: Request, res: Response, next: NextFunction) => {

     if(!req.query.fromDate || !req.query.toDate || !req.query.user || !req.query.aggregateMinutes) {
          return res.status(403).json({
               msg: "Los parámetros 'fromDate, 'toDate', 'user' y 'aggregateMinutes' son requeridos"
          });
     }
     next();

}

export const validationParamsCurrent = (req: Request, res: Response, next: NextFunction) => {

     if( !req.query.user ) {
          return res.status(403).json({
               msg: "El parámetro 'user' es requerido"
          });
     }
     next();

}