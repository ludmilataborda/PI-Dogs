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
        weight:e.weight.metric.split('-'),
        height:e.height.metric,  
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
           const mydog = dogbd.map(e => {
            e = {
              id: e.id,
              name:e.name,
              image:e.image,
              weight:e.weight.split('-'),
              height:e.height,  
              life_span:e.life_span,
              createdindb: e.createdindb, 
              temperaments:e.temperaments 
         }
            return e;
        })
           return mydog 
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
    const exocc = info.map(e => e.temperaments).filter(f=> f !== undefined )
    const occu = exocc.flat().map(l => l.trim())
   // const arr = occu(e => e.trim())
  const s =occu.sort((unaMascota, otraMascota) => unaMascota.localeCompare(otraMascota))
 
  let result = occu.filter((item,index)=>{
    return occu.indexOf(item) === index;
  })
 // console.log(result); //[1,2,6,5,9,'33']
       return result;
   }

module.exports= {
    infoapi,
    p, 
    dbInfo,
    both
}; 