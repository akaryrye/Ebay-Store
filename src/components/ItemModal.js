import React from 'react';

export default function ItemModal(props) {

   return (
      <div className='item-modal'>
         
         {/* Trigger/Open The Modal */}
         <button id='myBtn'>Open Modal</button>

         {/* The Modal */}
         <div id='myModal' class='modal'>
            <button  class='close'
                     onClick={props.toggleModal}
            >X</button>
            <div class='modal-content'>
               
               <p>Items will be displayed in greater detail here ...</p>
               <img src={props.currentItem.galleryURL[0]} />
            </div>
         </div>

      </div>
   )
}