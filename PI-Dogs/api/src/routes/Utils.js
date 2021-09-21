const { Dog, Temperament} = require('../db.js');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;



const lbtoKg = (weight) =>{ 
  let weight1 = weight.split(" - ") 
  var a,b;
  if(isNaN(parseInt(weight1[0]))) a = 18; else a=parseInt(weight1[0]) //  peso minimo es "up"
  if(isNaN(parseInt(weight1[1]))) b = a; else b=parseInt(weight1[1]) //no haya un peso maximo
  a = Math.floor(a * 0.453592)
  b = Math.ceil(b * 0.453592)
  var fw = [a,b].join(" - ") 
  return fw;
}


 const infoapi = async () => {
    const obj = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=' + YOUR_API_KEY); 
   const results = obj.data
    let arr= results.map(e => {
      e = {
        id: e.id,
        name:e.name,
        image:e.image.url,
        weight:lbtoKg(e.weight.imperial).split('-'),
        height:e.height.metric.split('-'),  
        life_span:e.life_span, 
        temperaments:e.temperament ? e.temperament.split(',') : e.temperament
      }
      return e 
      });
   // console.log(arr[0])
  return arr;  

  } 


const dbInfo = async () => {
  try {  const dogbd = await Dog.findAll({
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
              height:e.height.split('-'),  
              life_span:e.life_span + ' years',
              createdindb: e.createdindb, 
              temperaments:e.temperaments ? e.temperaments.map(e=>e.name) : [] 
         }
        // console.log(e)
            return e;
        })
           return mydog 
      }
    } catch(error) {
      console.log(error)
     
    }
      }
  
const both = async () => {
   const info = await infoapi();
  const db = await dbInfo();
  const unidos = db.concat(info)
   return unidos;
  } 

const p = async () => {
    const info = await infoapi();
    const exocc = info.map(e => e.temperaments).filter(f=> f !== undefined )
    const occu = exocc.flat().map(l => l.trim())
   
  const s =occu.sort((unaMascota, otraMascota) => unaMascota.localeCompare(otraMascota))
 
  let result = occu.filter((item,index)=>{
    return occu.indexOf(item) === index;
  })
       return result;
   }

module.exports= {
    infoapi,
    p, 
    dbInfo,
    both
}; 