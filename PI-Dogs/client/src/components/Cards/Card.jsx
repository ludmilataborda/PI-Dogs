import React from 'react';
import './Card.css'
import {Link} from 'react-router-dom'

function Card ({ name, image, temperaments, id}) {
 return (
    <>
          <div className = 'name1'>
             <Link to={`/perro/${id}`}>
                  {name}    
             </Link>
          </div>

          <img className = 'pic'src={image ? image :'https://t1.uc.ltmcdn.com/images/7/6/6/img_como_dibujar_un_perro_adorable_38667_600.jpg'} alt={"img"}/> 

          <div className = 'divDietsNames'>
             {temperaments.map((f,i) =>(f.name ? <p key = {i}>{f.name}</p>: <p key ={i}>{f}</p>))}  
          </div>
     </>
   
 )
}

export default Card