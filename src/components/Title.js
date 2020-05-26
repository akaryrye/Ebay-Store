import React from 'react';
import Row from 'react-bootstrap/Row';
import sallyMd from "../assets/images/sallysuction-md.jpg";

export default function Title () {

   return (
      <div className='row'>
         <div className='col'>
            <div className="jumbotron jumbotron-fluid">
               <Row className="container">
                  <h1 className="display-4 col-7 col-sm-8 col-lg-10 text-center">Sally's Fine Vintage Toys</h1>
                  <img src={sallyMd} className="col-5 col-sm-4 col-lg-2"></img>
               </Row>
            </div> 
         </div>
      </div>
   )
}