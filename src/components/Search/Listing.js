import React from 'react';

export default function Listing (props) {

   return (
      
      <div className="card search-result-item">
         <img className="card-img-top" src={props.item.galleryURL[0]} alt="item thumbnail" />
         <div className="card-body">
            <h6 className="card-title">{props.item.title[0]}</h6>
            <h5 className="card-text">${props.item.shippingInfo[0].shippingServiceCost[0]['__value__']}</h5>
            <p className="card-text">${props.item.sellingStatus[0].currentPrice[0]['__value__']} shipping</p>
         </div>
      </div>
   )
}