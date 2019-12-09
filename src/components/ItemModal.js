import React from 'react';

export default function ItemModal() {

   return (
      <div className='item-modal'>
         
         {/* Trigger/Open The Modal */}
         <button id="myBtn">Open Modal</button>

         {/* The Modal */}
         <div id="myModal" class="modal">
            <div class="modal-content">
               <span class="close">&times;</span>
               <p>Some text in the Modal..</p>
               <p>Items will be displayed in greater detail here ...</p>
            </div>
         </div>
      </div>
   )
}