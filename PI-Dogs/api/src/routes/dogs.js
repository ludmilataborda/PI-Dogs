const { Router } = require('express');
const { infoapi, p, dbInfo, both } = require('./Utils.js')
const { Dog, Temperament} = require('../db.js');


const router = Router();
 
router.get('/', async function(req, res) {
    let {name} = req.query;
    const all =  await both()
    const dogsToSend = all.map(e => {
       e = {
         id:e.id,
         name:e.name,
         image:e.image,
         temperaments: e.temperaments ? e.temperaments.name ? e.temperaments.map(e => e.name) : e.temperaments : [],
         weight: e.weight.map(e => Number(e)), 
         createdindb : e.createdindb ? e.createdindb : undefined
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

router.post('/',async function(req, res) {
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

 router.get('/:idRaza', async function(req, res) {
        /*GET /dogs/{idRaza}:  */   
       let {idRaza} = req.params;
       let all = await both();
       // console.log(idRaza)
        const dog= all.filter(e => {
          if(e.id == idRaza) {
              return e;
          } });
           
           if(!dog.length) {  
             return res.status(400).send('no existe perri con id '+ idRaza)
         } 
          else {  return  res.json(dog)}  
          
 });

module.exports =  router;