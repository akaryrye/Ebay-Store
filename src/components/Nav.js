import React from 'react';

export default function Nav () {

   return (
      <div className='row mt-1'>
         <div className='col'>
            <nav className="navbar navbar-nav mr-auto d-flex flex-row justify-content-around navbar-dark bg-dark">
               <a className="navbar-brand" href="/">Home</a>
               <a className="nav-item nav-link" href="/about">About</a>
               <a className="nav-item nav-link" href="/table">Categories</a>
               <a className="nav-item nav-link" href="/search">Search</a>
               
               <div className="">
               </div>
            </nav> 
         </div>
      </div>
   )
}