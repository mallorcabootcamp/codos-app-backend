const probando = (req: any, res: any ) => {

     try {
          res.json({
               ok: true,
               msg: 'Hola mundo'
          });
     
     } catch(error) {
          console.log('ERROR: ', error);
          res.status(500).json({
               ok: false,
               msg: 'Error de servidor'
          });
     }
};

module.exports = probando;