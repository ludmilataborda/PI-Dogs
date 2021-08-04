import s from './App.module.css';
import React from "react";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
    <div className={s.App}>
      <h1 className= {s.t}>Welcome !</h1>

         <Link to='/home'>
           <button className={s.button}> HOME</button>
          </Link>
         </div>

       <div >
       <img className ={s.res} src="https://biotechmagazineandnews.com/wp-content/uploads/2019/10/perros.jpg" alt={"img"}/> 
      </div>
     
     </>
  );
}

export default LandingPage;