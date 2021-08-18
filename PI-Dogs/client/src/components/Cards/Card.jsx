import React from 'react';
import c from './Card.module.css'
import {Link} from 'react-router-dom'

function Card ({ name, image, temperaments, id}) {
 return (
    <>
          <div className = {c.name1}>
             <Link to={`/perro/${id}`}>
                 <p  className ={c.name} >{name}</p>  
             </Link>
       

          <img className ={c.pic} src={image ? image :'https://t1.uc.ltmcdn.com/images/7/6/6/img_como_dibujar_un_perro_adorable_38667_600.jpg'} alt={"img"}/> 

          <div className = {c.divDietsNames}>
             {temperaments ? temperaments.length ? temperaments.map((f,i) =>(f.name ? <p key = {i}> {f.name} </p>: <p key ={i}>{f}</p>)) : <p>Temperament not defined</p>: <p>Sorry dog does not exist</p>}  
          </div>   
          </div>
     </>
   
 )
}

export default Card