import React from 'react';
import p from'./pagination.module.css'


function Pagination({postsPerPage, totalPosts, paginate}) {
  const pageNumbers = [];

  for(let i =1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
      pageNumbers.push(i);
  }
    return (
      <nav > 
          <ul className= {p.pagination}>
              {pageNumbers.map((n,i )=> (
                  <div className = {p.center}>
                  <li key={i }>
                      <button className={p.numberStyles} onClick ={ () => paginate(n)} >
                          {n}
                      </button>
                  </li>
                  </div>
              ))}
          </ul>
      </nav>
    
    );
  }
  
  export default Pagination; 