import React from 'react';
import './Card.css'
import {Link} from 'react-router-dom'

function Card ({ name, image, temperaments, id}) {
 return (
    <>
          <div className = 'name1'>
             <Link to={`/recipe/${id}`}>
                  {name}    
             </Link>
          </div>

          <img className = 'pic'src={image ? image : 'C:\Users\tyt\Desktop\PI-2DOGS\PI-Dogs\dog.png'} alt={"img"}/> 

          <div className = 'divDietsNames'>
             {temperaments.map((f,i) =>(f.name ? <p key = {i}>{f.name}</p>: <p key ={i}>{f}</p>))}  
          </div>
     </>
   
 )
}

export default Card