const { Dog, Temperament} = require('../db.js');
const axios = require('axios');

 const infoapi = async () => {
    const obj = await axios.get('https://api.thedogapi.com/v1/breeds'); 
   const results = obj.data
    let arr= results.map(e => {
      e = {
        id: e.id,
        name:e.name,
        image:e.image.url,
        weight:e.weight,
        height:e.height,  
        life_span:e.life_span, 
        temperaments:e.temperament ? e.temperament.split(',') : e.temperament
      }
      return e 
      });
   // console.log(arr[0])
  return arr;  

  } 
// infoapi()
  
const dbInfo = async () => {
    const dogbd = await Dog.findAll({
        include:{
           model: Temperament,
           attributes: ['name'],
               through : {
                  attributes:[],
               },
             }
       });
        if(!dogbd.length) {
            return []
          }
          else { 
            return dogbd;
         }
      }
  
   const both = async () => {
    const info = await infoapi();
    const db = await dbInfo();
    const unidos = db.concat(info)
    return unidos;
  } 

/* 
[ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal */

const p = async () => {
    const info = await infoapi();
    const exocc = info.map(e => e.temperaments)
    const occu = exocc.flat()
     //  console.log(occu)
       return occu
   }

module.exports= {
    infoapi,
    p, 
    dbInfo,
    both
}; 