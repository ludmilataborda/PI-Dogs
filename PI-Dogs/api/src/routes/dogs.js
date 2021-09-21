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
             return res.status(200).send(dogsToSend)
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
/*  */


router.post('/',async function(req, res) {
    const {name, height,weight,life_span,image,createdindb, temperaments} = req.body;
       
  try{  const dogCreated = await Dog.create({
               name,
               height,
               weight,
               life_span,
               image,
               createdindb
         }); 
     if(temperaments) { 
        let tempOndb= await Temperament.findAll({where: {
           name: temperaments
         } })
         dogCreated.addTemperament(tempOndb) 
        return res.send('dog created with temperaments!')
       }
     else { return res.send('dog created'); } 
     
    }catch(error) {
        console.log(error)
      }
       
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
router.get('/pr', function(req, res) {
  both().then(result => {
    var info = result 
    res.send(info)
  })
 
})
module.exports =  router;


/* try{  const a= await Recipe.findOne({
    where: {
        id: idReceta },
    include: Dietype
    })
  
   let b= a.dataValues
  // console.log(a)
   let dbRecipe = {
     name: b.name,
     summaryARREGLAR: b.dishResume ,
     score: b.score,
     healthScore: b.healthScore ,
     instructions: b.instructions,
     dietypes: b.dietypes.map(e => e.dataValues.name)
   } 

   
   //console.log(dbRecipe)
    return res.send(dbRecipe)
   } catch(error) {
     console.log(error)
     return res.send('no existe receta')
   }
} */