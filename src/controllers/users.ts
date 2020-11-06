import { Request, Response } from 'express';

export const users = (req: Request, res: Response) => {

     const userslist: any = [];

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

