import { Request, Response } from 'express';
import { config } from '../config'

export const users = (req: Request, res: Response) => {

     const userslist: any = config.userslist;

          try {
              res.json({
                   users: userslist
              })

          } catch (error) {
               console.log('ERROR: ', error);
               res.status(500).json({
                    ok: false,
                    msg: 'Error de servidor'
               });
          }
     
};

