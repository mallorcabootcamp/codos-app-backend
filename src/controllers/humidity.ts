import { Request, Response } from 'express';
export const dataHumidity = (req: Request, res: Response ) => {

     const fromDate = req.query.fromDate;
     const toDate = req.query.toDate;

     ServiceUIFrameContext.getCo2Data()

     try {
          res.json({
               ok: true,
               msg: 'Hola mundo desde humidity',
               data: req.query
          });
     
     } catch(error) {
          console.log('ERROR: ', error);
          res.status(500).json({
               ok: false,
               msg: 'Error de servidor'
          });
     }
};

