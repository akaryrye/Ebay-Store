import React from 'react';

export default function Listing (props) {

   return (
      
      <div className="card search-result-item">
         <img className="card-img-top" src={props.item.galleryURL[0]} alt="item thumbnail" />
         <div className="card-body">
            <h5 className="card-title">{props.item.title[0]}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         </div>
      </div>
   )
}