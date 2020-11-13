import { NextFunction, Request, Response } from 'express';
import { config } from '../config'
import debug from 'debug';

const log = debug("app:controller:users");

export const users = (req: Request, res: Response, next: NextFunction) => {

     log("getting users data");

     const userslist: any = config.userslist;

          try {

               log("receiving users data");

              res.json({
                   users: userslist
              })

          } catch (error) {
               log('ERROR: ', error);
               res.status(500).json({
                    ok: false,
                    msg: 'Error de servidor'
               });
          }

          next();
     
};

