import React from 'react';

export default function ItemModal(props) {

   return (
      <div className='item-modal'>
         
         {/* Trigger/Open The Modal */}
         <button id='myBtn'>Open Modal</button>

         {/* The Modal */}
         <div id='myModal' className='modal'>
            <button  className='close'
                     onClick={props.toggleModal}
            >X</button>
            <div className='modal-content'>
               { 
               props.currentItem ? (
                  <div>
                     <h4>{props.currentItem.title}</h4>
                     <img src={props.currentItem.galleryURL[0]}
                           alt='item thumbnail' />
                     <ul>
                        <li>Condition: {props.currentItem.condition[0].conditionDisplayName}</li>
                        <li>End Time: {props.currentItem.listingInfo[0].endTime}</li>
                        <li>Location: {props.currentItem.location}</li>
                        <li>Payment Method(s) accepted: {props.currentItem.paymentMethod}</li>
                        <li>Primary Category: {props.currentItem.primaryCategory[0].categoryName}</li>
                        <li>Returns Accepted: {props.currentItem.returnsAccepted}</li>
                        <li>Current Price: {props.currentItem.sellingStatus[0].currentPrice[0]['__value__']} {props.currentItem.sellingStatus[0].currentPrice[0]['@currencyId']}</li>
                        <li>Listing State: {props.currentItem.sellingStatus[0].sellingState}</li>
                        <li>Handling Time: {props.currentItem.shippingInfo[0].handlingTime}</li>
                        <li>Ships To: {props.currentItem.shippingInfo[0].shipToLocations}</li>
                        <li>Shipping Cost: {props.currentItem.shippingInfo[0].shippingServiceCost[0]['__value__']} {props.currentItem.shippingInfo[0].shippingServiceCost[0]['@currencyId']}</li>
                        <li><a href={props.currentItem.viewItemURL}>Link to Listing on Ebay</a></li>
                     </ul>
                  </div>
               ) : (
                  <p>no item to show</p>
               )}
            </div>
         </div>

      </div>
   )
}