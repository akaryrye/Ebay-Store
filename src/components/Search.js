import React, { Component } from 'react';
import { observer } from "mobx-react"
import axios from 'axios';
import ItemModal from './ItemModal';

const baseUrl = "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?SERVICE-VERSION=1.13.0"
const appID = "&SECURITY-APPNAME=RyanAlld-ProjectT-PRD-5dfb0df12-1f10d5a8";
const storeName = "Sally%27s%20Fine%20Vintage%20Toys";
const findInStore = `&OPERATION-NAME=findItemsIneBayStores&storeName=${storeName}`;
const respFormat = "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD";
let paginate = "&paginationInput.entriesPerPage=20&paginationInput.pageNumber=";

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
      let url = `${baseUrl}${appID}${respFormat}${findInStore}${paginate}${this.props.store.searchResults.page}`;
      
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
            } else {
               console.log('No items were retrieved, possible error')
            }
         })
   }

   handleChange = (e) => {
      this.props.store.updateSearchTerm(e.target.name, e.target.value)
   }

   handlePaginate = (e) => {
      this.handleChange(e)
      this.searchByKey(e)
   }

   toggleModal = () => {
      this.props.store.toggleModal();
   }

   render () {
      return (
         <div className='search'>
            
            <select  onChange={this.handleChange}
                     name='currentCategory' >
               <option  value="all" >
                        All Categories</option>
               { this.props.store.searchResults.categories ? (
                  this.props.store.searchResults.categories.map( (category, index) => (
                     <option key={index} value={category.id}>{category.name}</option> 
                  ))
               ) : (
                  null
               )}
            </select>

            <input   type='text'
                     id='searchByKey-input'
                     name='keyword'
                     placeholder='keyword'
                     onInput={this.handleChange} />
            <button  id="searchByKey-btn"
                     onClick={this.searchByKey} >
                     Search</button>
            <button  className='close'
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
            <div className='pageButtons'>
               <button  className='pageBtn'
                        name='page'
                        value='1'
                        onClick={this.handleChange} >
                        one</button>
               <button  className='pageBtn'
                        name='page'
                        value='2'
                        onClick={this.handlePaginate} >
                        two</button>
            </div>

            {this.props.store.searchResults.showModal && 
               <ItemModal toggleModal={this.toggleModal}
                           currentItem={this.props.store.searchResults.currentItem} />
            }
         </div>
      )
   }
} 