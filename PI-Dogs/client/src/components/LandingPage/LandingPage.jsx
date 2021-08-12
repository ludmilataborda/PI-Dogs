import s from './App.module.css';
import React from "react";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>

   <div className={s.App}>
        <h4>
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
          <span>!</span>
          </h4> 

      {/*    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css" />
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap" rel="stylesheet" /> */}
      
      
         <Link to='/home'>
        <button type="button" className={s.fill}>HOME</button>
          {/*  <button id={s.foot}><button className={s.button1}><a href="#">HOME</a></button></button> */}
           </Link>






{/* <button type="button" className={s.slide}>
  <div>Slide</div>
  <i className="icon-arrow-right"></i>
</button> */}
   

       <div className={s.im}>
       <img className ={s.res} src="https://vidaconmascotas.com/wp-content/uploads/2021/03/%C2%BFCuantas-razas-de-perros-existen-en-el-mundo-Todos-los.jpg" alt={"img"}/>  
      </div>
      </div>
     </>
  );
}

export default LandingPage;