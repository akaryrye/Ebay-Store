import React, { Component } from 'react';
import { observer } from "mobx-react"
import axios from 'axios';
import ItemModal from './ItemModal';



const baseUrl = "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?SERVICE-VERSION=1.13.0"
const appID = "&SECURITY-APPNAME=RyanAlld-ProjectT-PRD-5dfb0df12-1f10d5a8";
const storeName = "Sally%27s%20Fine%20Vintage%20Toys";
const findInStore = `&OPERATION-NAME=findItemsIneBayStores&storeName=${storeName}`;
//const findByKey = "&OPERATION-NAME=findItemsByKeywords";
const respFormat = "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD";
const url = `${baseUrl}${appID}${respFormat}${findInStore}`;


export default class Search extends Component {

   Search = observer(Search)

   searchByKey = (e) => {
      let keyword = this.props.store.searchResults.keyword
      console.log(keyword)
      axios.get(url + `&keywords=${keyword}`)
         .then( result => {
            
            //let data = JSON.parse(result);
            let items = result.data.findItemsIneBayStoresResponse[0].searchResult[0].item;
            
            if (items) {
               console.log(items)
               this.props.store.insertItems(items)
            }
         })
   }

   handleChange = (e) => {
      this.props.store.updateSearchTerm(e.target.name, e.target.value)
   }

   toggleModal = () => {
      this.props.store.toggleModal();
   }

   /* currentItem = (index) => {

   } */

   render () {
      return (
         <div className="search">
            <input   type='text'
                     id='searchByKey-input'
                     name='keyword'
                     placeholder='keyword'
                     onInput={this.handleChange} />
            <button  id="searchByKey-btn"
                     onClick={this.searchByKey} >
                     Search</button>
            <button  class='close'
                     onClick={this.toggleModal} >
                     X</button>

            <u><h3>Search Inventory</h3></u>
            <ol>
            
            {this.props.store.searchResults.items &&
               this.props.store.searchResults.items.map((item, index) => (
                  <li   key={index}
                        onClick={() => this.props.store.currentItem(index)} >
                     <div className='search-result-item'>{item.title[0]}</div>
                  </li>
               ))
            }
            
            </ol>
            {this.props.store.searchResults.showModal && 
               <ItemModal toggleModal={this.toggleModal}
                           currentItem={this.props.store.searchResults.currentItem} />
            }
         </div>
      )
   }
} 