// Ruta '/'

const { Router } = require('express');

const router = Router();

const prueba = require('../controllers/prueba');

router.get( '/', prueba );


module.exports = router;
