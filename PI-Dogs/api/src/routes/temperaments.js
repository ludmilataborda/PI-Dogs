const { Router } = require('express');
const { infoapi, p, dbInfo, both } = require('./Utils.js')
const { Dog, Temperament} = require('../db.js');
const router = Router();

const tempera = async () => {
  let temp = await p() 
  let dogs = temp.map(e => {
      return {name: e }
  })
  //console.log(dogs)
try {const t = await  Temperament.findAll()
if(!t.length) {
  const tem = await Temperament.bulkCreate(dogs) 
    return tem  
}
else { return t }
} catch(error) {
  console.log(error)
} 
}


router.get('/', async function(req, res) {
   await tempera()

   const temperament = await Temperament.findAll()
    /* const r = temperament.map(e => e.name)
     console.log(r) */
        res.send(temperament)
    }); 

module.exports =  router;

