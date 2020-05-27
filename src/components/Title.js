import React from 'react';
import Row from 'react-bootstrap/Row';
import sallyMd from "../assets/images/sallysuction-md.jpg";

export default function Title () {

   return (
      <div className='row'>
         <div className='col'>
            <div className="jumbotron jumbotron-fluid">
               <Row className="container justify-content-between align-items-center">
                  <img src={sallyMd} className="col-5 col-sm-4 col-lg-2"></img>
                  <h1 className="display-4 col-7">Sally's Fine Vintage Toys</h1>
               </Row>
            </div> 
         </div>
      </div>
   )
}