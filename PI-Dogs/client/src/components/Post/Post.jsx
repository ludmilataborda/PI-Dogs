import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postsDogstoBack} from '../../actions/actions';
//import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import './Post.css'



/*  function validate(input) { 
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
    //                     
  }

  if (!input.dishResume) {
    errors.dishResume = 'Summary is required';
  } 
  return errors;
}; */


function Post() {

const dispatch = useDispatch();
const history = useHistory()
const [input, setInput] = useState({
    name: '',
    life_span:'',
    image:'',
   temperaments:[]
   // createdindb: true,
 });
 const [weight, setWeight] = useState({
     max:'',
     min:''
 })
 const [height, setHeight] = useState({
     max:'',
     min:''
})
/*   const [errors, setErrors] = useState({}) */

 
 useEffect(() => {
       dispatch(getTemperaments())        
  },[dispatch]);

let temp = useSelector((state) => state.temperaments);



  function handleChange(e) { 
  setInput({...input, 
    [e.target.name]: e.target.value});
 //setErrors(validate({...input,[e.target.name]: e.target.value}));
}  
function handleWeight (e) { 
  setWeight({...weight, 
    [e.target.name]: e.target.value});

}  
function handleHeight (e) { 
  setHeight({...height, 
    [e.target.name]: e.target.value});

}  
function handleSelect(e){
  setInput({
      ...input,
      temperaments: [...input.temperaments,e.target.value]
  })
}

function handleSubmit(e) {
  e.preventDefault()
   
  const send = {
    ...input, 
    weight: weight.min + ' - ' + weight.max,
    height: height.min + ' - ' + height.max
   }

   console.log(send)
   dispatch(postsDogstoBack(send))  
   alert("Personaje creado!!")
    setInput({
        name:" ",
        life_span:'',
         image:'',
        temperaments:[]
    })
    setWeight({
      max:'',
      min:''
   })
    setHeight({
      max:'',
      min:''
    })
    history.push('/home')
} 
 /*  if(loading) {
      return <h2>Loading...</h2>
  } */

    return (
      <div className='post'>

        <div className = 'h1yb'>
           <NavLink to='/home' >
            <button className = 'b5'>BACK</button>
            </NavLink>
            <h2 className = 't6'>Fill to create your own dog</h2>
         </div>

          
             <form  onSubmit={(e)=>handleSubmit(e)}>
             <div className= 'form'>

             <div className = 'v1'> 
             <label >Name: </label> 
             <input
              className = 'z1'
           /* className = {errors.name ? 'danger' : 'z1'} */
			        name='name'
              type= 'text'
			        value={input.name}
			    	  onChange={(e)=>handleChange(e)} 
			    	  placeholder='Name'
		         />
            {/*   {errors.name && (<p className="danger">{errors.name}</p>)} */}
           </div>
             
           <div className = 'v3'>
           <label>Life span:</label> 
              <input
                  /*className = {errors.dishResume ? 'danger' : 'z3'} */
                  className = 'z3'
                  type= 'text'
				          name='life_span'
				          value={input.life_span}
				          onChange={(e)=>handleChange(e)} 
			            placeholder='years'
		            />
         {/*   {errors.dishResume && (<p className="danger">{errors.dishResume}</p>)} */}
             </div>

               <div className = 'v4'> 
               <h4>Weight:</h4> 
               <label>min</label>
               <input
                 className ='z3'
                 type= 'text'
			           name='min'
			    	     value={weight.min}
				         onChange={(e)=>handleWeight(e)} 
				         placeholder='min'
		         	   />
                <label>max</label>
               <input
                 className ='z3'
                 type= 'text'
			           name='max'
			    	     value={weight.max}
				         onChange={(e)=>handleWeight(e)} 
				         placeholder='max'
		         	  />
            </div>
            
            <div className = 'v4'> 
               <h4>Height:</h4> 
               <label>min</label>
               <input
                 className ='z3'
                 type= 'text'
			           name='min'
			    	     value={height.min}
				         onChange={(e)=>handleHeight(e)} 
				         placeholder='min'
		         	   />
                <label>max</label>
               <input
                 className ='z3'
                 type= 'text'
			           name='max'
			    	     value={height.max}
				         onChange={(e)=>handleHeight(e)} 
				         placeholder='max'
		         	  />
            </div>
          
              <div className = 'v6'>
              <label>Image:</label> 
		     	    <input
               className='z6'
			   	      name='image'
			          value={input.image}
			          onChange={(e)=>handleChange(e)}
			   	      placeholder='image'
			         />
          </div>
               
              <label>Choose Temperaments:</label>
              <select  onChange={(e) => handleSelect(e)}>
               {temp.map((o, i) => (
                   <option key ={i} value={o.name}>{o.name}</option>
                ))}
                </select>
                <ul><li>{input.temperaments.map(el => el + " ,")}</li></ul> 

            <button className='b8' type="submit">send</button>  
			  </div> 
          </form> 
         

        </div>

    );
}
export default Post;  
/* ruta de creación de raza de perro: debe contener

[ ] Un formulario controlado con los siguientes campos
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro */