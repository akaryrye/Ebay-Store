import React from 'react';
import { Link } from 'react-router-dom';


export default function Nav() {

   return (
      <div className='nav'>
         <p><Link to="/about">About Us</Link></p>
         <p><Link to="/table">Categories</Link></p>
         <p><Link to="/search">Search</Link></p>
      </div>
   )
}