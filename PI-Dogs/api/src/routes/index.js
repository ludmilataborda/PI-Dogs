const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperaments = require('./temperaments');
const dogsRoutes = require('./dogs'); 



const router = Router();
router.use('/temperament', temperaments)
router.use('/dogs', dogsRoutes)



module.exports = router;

