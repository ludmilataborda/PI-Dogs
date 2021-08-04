import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDogs, sortbyNames, sortbyWeight, filterByDb, getNames } from '../../actions/actions';
import h from './Home.module.css';

//import { getCharacters,filterByStatus, filterByDb, sortNames, getNames } from '../../actions/actions';
import Card from '../Cards/Card';
import Pagination from '../pagination/Pagination';

function Home() {
 const [input, setInput]= useState('') 

 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(9);
 const [orden, setOrden]= useState('');

 const dispatch = useDispatch()
 const dogies = useSelector ((state) => state.dogs)
 
 useEffect (()=>{
    dispatch(getAllDogs());
},[dispatch])

const indexOfLastPost = currentPage * postsPerPage;
const indexofFirstPost = indexOfLastPost - postsPerPage;
let currentPosts = dogies.slice(indexofFirstPost, indexOfLastPost);
const paginate = pageNumber => setCurrentPage(pageNumber);

function handleClick(e){
    e.preventDefault();
    dispatch(getAllDogs());
   // console.log(dogies)
}
function handleChange(e){
   e.preventDefault()
   setInput(e.target.value)
  }
 function  handleSubmit(e) {
   e.preventDefault();
    dispatch(getNames(input)); 
   setInput('')
 }

function handleSort (e){
   e.preventDefault();
   dispatch(sortbyNames(e.target.value))
   setCurrentPage(1);
   setOrden(`Ordenado ${e.target.value}`)
}
function handlefilterweight(e) {
   e.preventDefault();
   dispatch(sortbyWeight(e.target.value))
   setCurrentPage(1);
   setOrden(`Ordenado ${e.target.value}`)
}
 function handleCreated(e) {
     dispatch(filterByDb(e.target.value))
  }
  return(
     <div >
        <div className={h.big}>
         <h1>Dogs</h1>
          <button onClick={e=> {handleClick(e)}}>
              All dogs
           </button>
          
         
         <div className = 'searchAndButt'> 
          {/*   <Link to='/post'>  </Link> */}
           <button className = 'b1'> Create your own dog</button>
         
       
        <form  onSubmit={e => handleSubmit(e)} >
            <label className = 'l1'>Search by name: </label>
            <input
             className= 'i1'
              name='name'
              type= 'text'
              value={input}
              onChange={e =>handleChange(e)} 
              placeholder='name'
              />
            <button className ='b2' type="submit">Search</button> 
      
         </form> 
      </div> 
 
         <label>Order by name</label>
         <select  onChange={e => handleSort(e)} >
             <option value= 'asc'>a-z</option>
             <option value= 'desc'>z-a</option>
         </select>

         <label>Order by weight</label>
          <select  onChange= {e=> handlefilterweight(e)} >
            <option value= 'asc'>asc</option>
            <option value= 'desc'>desc</option>
        </select>

         <select  onChange= {e=> handleCreated(e)} >
            <option value='All'>All</option>
            <option value= 'created'>Created</option>
           <option value='api'>Existing</option>
        </select> 

      
         <div className = 'all'>
          <ul className='DisplayRecipes'>
           {currentPosts?.map(p => (
             <li className = 'lis1' key={p.id}>
             <div className = 'name1'>
             <Card  name ={p.name} image = {p.image} temperaments ={p.temperaments} id = {p.id} />  
                     </div>
                  </li>
                ))}
             </ul>
            </div>
               </div>
      <div>
       <Pagination postsPerPage ={postsPerPage} totalPosts = {dogies.length} paginate={paginate}/> 
      </div>
</div>
    
  );
}


export default Home;
/* Ruta principal: debe contener

[ ] Input de búsqueda para encontrar razas de perros por nombre
[ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
Imagen
Nombre
Temperamento
[ ] Botones/Opciones para filtrar por por temperamento y por raza existente o agregada por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por orden alfabético y por peso
[ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 9 razas inicialmente en la página uno. */