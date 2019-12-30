import React, { Component } from 'react';
import { observer } from "mobx-react"
import axios from 'axios';
import ItemModal from './ItemModal';
import Listing from './Listing';
import Modal from 'react-bootstrap/Modal';

const baseUrl = "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?SERVICE-VERSION=1.13.0"
const appID = "&SECURITY-APPNAME=RyanAlld-ProjectT-PRD-5dfb0df12-1f10d5a8";
const storeName = "Sally%27s%20Fine%20Vintage%20Toys";
const findInStore = `&OPERATION-NAME=findItemsIneBayStores&storeName=${storeName}`;
const respFormat = "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD";
let entriesPerPage = `&paginationInput.entriesPerPage=`;
let pageNumber = `&paginationInput.pageNumber=`;

export default class Search extends Component {

   Search = observer(Search)

   componentDidMount () {
      axios.get(`${baseUrl}${appID}${respFormat}${findInStore}`)
         .then( result => {
            const items = result.data.findItemsIneBayStoresResponse[0].searchResult[0].item;
            items.forEach( item => {
               const category = {
                  name: item.primaryCategory[0].categoryName[0], 
                  id: item.primaryCategory[0].categoryId[0] 
               }
               this.props.store.insertCategory(category)
            })
         })
   }

   searchByKey = (e) => {
      
      let url =   `${baseUrl}${appID}${respFormat}${findInStore}
                  ${entriesPerPage}${this.props.store.searchResults.resultsPerPage}
                  ${pageNumber}${this.props.store.searchResults.page}`;
      
      if (this.props.store.searchResults.keyword !== "") {
         url += `&keywords=${this.props.store.searchResults.keyword}`
      }

      if (this.props.store.searchResults.currentCategory !== 'all') {
         url += `&categoryId=${this.props.store.searchResults.currentCategory}`
      }
      
      axios.get(url)
         .then( result => {
            if (result.data.findItemsIneBayStoresResponse[0].searchResult[0].item) {
               let items = result.data.findItemsIneBayStoresResponse[0].searchResult[0].item;
               this.props.store.insertItems(items)
               let pages = result.data.findItemsIneBayStoresResponse[0].paginationOutput[0].totalPages[0]
               this.props.store.updateSearchTerm("totalPages", pages)
               console.log('pages = ' + pages);
            } else {
               console.log('No items were retrieved, possible error')
            }
         })
   }

   handleChange = (e) => {
      this.props.store.updateSearchTerm(e.target.name, e.target.value)
      this.props.store.updateSearchTerm('page', 1)
   }

   updatePage = (e) => {
      this.props.store.updateSearchTerm('page', e.target.value)
      this.searchByKey(e)
   }

   /* handlePaginate = (e) => {
      this.handleChange(e)
      this.searchByKey(e)
   } */

   toggleModal = () => {
      this.props.store.toggleModal();
   }

   render () {
      return (
         <div className='row'>
            <div className='col'>
               <u><h3>Search Inventory</h3></u>
               <div className='row'>
                  <div className='col form-group'>
                     
                     <div className='row'>
                        <label for='keyword' className='col'>Search Keyword (optional)</label>
                        <input   className='form-control col'
                                 type='text'
                                 id='searchByKey-input'
                                 name='keyword'
                                 placeholder='keyword'
                                 onInput={this.handleChange} />
                     </div>

                     <div className='row'>
                        <label for='currentCategory' className='col'>Choose a Category (optional)</label>
                        <select  className='form-control col'
                                 name='currentCategory'
                                 onChange={this.handleChange} >
                           <option  value="all" >
                                    All Categories</option>
                           { this.props.store.searchResults.categories ? (
                              this.props.store.searchResults.categories.map((category, index) => (
                                 <option key={index} value={category.id}>{category.name}</option> ))
                           ):(
                              null )}
                        </select>
                     </div>
                     
                     <div className='row'>
                        <label for='resultsPerPage' className='col'>Show {this.props.store.searchResults.resultsPerPage} Results Per Page</label>
                        <input   className='form-control col'
                                 type='range'
                                 min={5}
                                 max={50}
                                 value={this.props.store.searchResults.resultsPerPage}
                                 id='resultsPerPage'
                                 name='resultsPerPage'
                                 placeholder='Number of Results'
                                 onChange={this.handleChange} />
                     </div>
                     
                     <div className='row'>
                        <label for='page' className='col'>Page {this.props.store.searchResults.page}</label>
                        <input   className='form-control col'
                                 type='range'
                                 min={1}
                                 max={this.props.store.searchResults.totalPages}
                                 value={this.props.store.searchResults.page}
                                 id='pageNumber'
                                 name='page'
                                 placeholder='Page'
                                 onChange={this.updatePage} />
                     </div>

                     <div className='row'>
                        
                        {parseInt(this.props.store.searchResults.page) > 1 &&
                           <button  className='btn'
                                    value={parseInt(this.props.store.searchResults.page) - 1}
                                    onClick={this.updatePage} >
                                    prev</button>
                        }
                        
                        {parseInt(this.props.store.searchResults.page) < parseInt(this.props.store.searchResults.totalPages) &&
                           <button  className='btn'
                                    value={parseInt(this.props.store.searchResults.page) + 1}
                                    onClick={this.updatePage} >
                                    next</button>
                        }

                     </div>
                     
                     <button  className="btn btn-primary float-right"
                              type='submit'
                              id='searchByKey-btn'
                              onClick={this.searchByKey} >
                              Search</button>
                  </div>
               </div>
               
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
                        ))
                     }
                     </ol>
                  </div>
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