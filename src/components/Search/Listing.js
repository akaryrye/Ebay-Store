import React from 'react';

export default function Listing (props) {

   let shipping = props.item.shippingInfo[0].shippingServiceCost[0]['__value__'];
   let price = props.item.sellingStatus[0].currentPrice[0]['__value__']

   if (/\.\d$/.test(shipping)) shipping += '0'
   if (/\.\d$/.test(price)) price += '0'

   return (
      
      <div className="card search-result-item">
         <img className="card-img-top" src={props.item.galleryURL[0]} alt="item thumbnail" />
         <div className="card-body">
            <h6 className="card-title">{props.item.title[0]}</h6>
            <h5 className="card-text">${price}</h5>
            <p className="card-text">${shipping} shipping</p>
         </div>
      </div>
   )
}