import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetails, getClear } from '../../actions/actions';

import { NavLink, useParams  } from 'react-router-dom';

function Detail () {
    //const [loading, setLoading] = useState(false);
    const {id} = useParams()
    
 const dispatch = useDispatch();

   useEffect(() => { 
    // setLoading(true)
      dispatch(getDogDetails(id))  
     // setLoading(false)      
     return () => dispatch(getClear())
  },[id, dispatch]);

 const dog = useSelector((state) => state.deteail);
   
 console.log(dog)
 
  return (
    <div className = 'recipe1'>
       
     <div className = 'tyb'>

      <NavLink to='/home' >
        <button className = 'b5'> BACK</button>
      </NavLink>
      </div> 
      
      {dog.length === 1 ? 
         <div> 
         <h2 className = 't4'>{dog[0].name}</h2> 

        <img className='pic2'  src={dog[0].image ? dog[0].image :'https://t1.uc.ltmcdn.com/images/7/6/6/img_como_dibujar_un_perro_adorable_38667_600.jpg'} alt="img"/> 

        {dog[0].life_span ? <h4 className = 't4'>Life span: {dog[0].life_span}</h4> : <></> } 
         
        {dog[0].height ?<div>
           <h4>Height</h4>
            <p>min: {dog[0].height[0]}</p>
            <p>max: {dog[0].height[1]}</p>
        </div> : <p>Height not defined</p>} 

        {dog[0].weight ?<div>
           <h4>Weight</h4>
            <p>min: {dog[0].weight[0]}</p>
            <p>max: {dog[0].weight[1]}</p>
        </div> : <p>Weight not defined</p>} 

        <div className = 'divDietsNames'>
           <h5>Temperamets:</h5>
             {dog[0].temperaments ?.map((f,i) =>(f.name ? <p key = {i}>{f.name}</p>: <p key ={i}>{f}</p>))}  
          </div>
       {/*<div className = 'dietypes2'>
      {charaDet.occupation ?charaDet.occupation.map((f,i) =>  (f.name ? <p key = {i}>{f.name}</p>: <p key ={i}>{f}</p>)) : <> </>} 
      </div>  
        <div className ='scores'>
         {charaDet.nickname ? <h5> {charaDet.nickname}</h5> : <> </> }
         {charaDet.birthdate ? <h5> {charaDet.birthdate}</h5> : <> </> }
         {charaDet.status ? <h5> {charaDet.status}</h5> : <> </> }
      </div>   */}
        </div> 
      : <h1> Loading ...</h1> }
   
    
  </div>
   ); 
}

export default Detail