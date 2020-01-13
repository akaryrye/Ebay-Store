import React, { Component } from 'react';
import { observer } from "mobx-react"

import ItemModal from './ItemModal';
import Listing from './Listing';
import Controls from './Controls';
import Modal from 'react-bootstrap/Modal';
import './search.css';


export default class Search extends Component {

   Search = observer(Search)

   toggleModal = () => {
      this.props.store.toggleModal();
   }

   render () {
      return (
         <div className='col'>
            <u><h3 className='search-title'>Search Inventory</h3></u>
            
            <Controls store={this.props.store} />
            
            <div className='row'>
               <div className='col'>
                  <ol className='row'>
                  {this.props.store.searchResults.items &&
                     this.props.store.searchResults.items.map((item, index) => (
                        <li   className='col col-sm-6 col-md-4 col-lg-3 col-xl-2'
                              key={index}
                              onClick={() => this.props.store.currentItem(index)} >
                           <Listing item={item} />
                        </li>
                     ))}
                  </ol>
               </div>
            </div>

            <Modal   show={this.props.store.searchResults.showModal}
                     onHide={this.toggleModal}
                     dialogClassName="modal-90w"
                     aria-labelledby="example-custom-modal-styling-title" >
               <ItemModal  toggleModal={this.toggleModal}
                           currentItem={this.props.store.searchResults.currentItem} />
            </Modal>               

         </div>
      )
   }
}

