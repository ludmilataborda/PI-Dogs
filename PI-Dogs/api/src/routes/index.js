const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
/* const temperaments = require('./temperaments');
const dogsRoutes = require('./dogs'); */
const { infoapi, p, dbInfo, both } = require('./Utils.js')
const { Dog, Temperament} = require('../db.js');
const axios = require('axios');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* [ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado */

router.get('/dogs', async function(req, res) {
 let {name} = req.query;
 const all =  await both()
 const dogsToSend = all.map(e => {
    e = {
      id:e.id,
      name:e.name,
      image:e.image,
      temperaments:e.temperaments 
    }
    return e 
  });
      //SI NO TENGO QUERY
     if(!name) {  
          console.log('dogies ', all.length)
          return res.send(dogsToSend)
      }
     //SI TENGO QUERY     
      else {
      const result= all.filter(e =>  {
         if(e.name.toLowerCase().includes(name.toLocaleLowerCase()) === true){
            return e
            }
          });
        //SI QUERY Q ME PASAN NO EXISTE
         if(result.length < 1) {
          return res.status(400).send('no existe perri con ese nombre')
        } 
       // console.log(result.length)
        return  res.json(result)
    }
}); 


   
router.get('/temperament', async function(req, res) {
   let temp = await p() 
   for(var i =0; i < temp.length; i++) {
    Temperament.findOrCreate({
        where: {name: temp[i]}
    })
   }
  const temperament = await Temperament.findAll()

       res.send(temperament)
   }); 

router.post('/dogs',async function(req, res) {
 const {name, height,weight,life_span,image,createdindb, temperaments} = req.body;
    
 const dogCreated = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
            createdindb
      }); 
    
     let tempOndb= await Temperament.findAll({where: {
        name: temperaments
      } })
      dogCreated.addTemperament(tempOndb) 
    
      res.send('dog created'); 
    });

   /*  [ ] GET /dogs/{idRaza}:
    Obtener el detalle de una raza de perro en particular
    Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
    Incluir los temperamentos asociados */
 router.get('/dogs/:idRaza', async function(req, res) {
    /*GET /dogs/{idRaza}:  */   
   let {idRaza} = req.params;
   let all = await both();
   // console.log(idRaza)
    const dog= all.filter(e => {
      if(e.id == idRaza) {
          return e;
      } });
       
       if(dog) { 
       return  res.json(dog)
     } 
      else {  return res.send('no existe dog cons ese id! ')}  
      
       });
module.exports = router;

