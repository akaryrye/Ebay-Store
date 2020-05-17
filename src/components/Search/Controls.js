import React, { Component } from 'react';
import { observer } from "mobx-react";
import axios from 'axios';

const baseUrl = "https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?SERVICE-VERSION=1.13.0"
const appID = "&SECURITY-APPNAME=RyanAlld-ProjectT-PRD-5dfb0df12-1f10d5a8";
const storeName = "sallbarnet0";
const findInStore = `&OPERATION-NAME=findItemsAdvanced&itemFilter(0).name=Seller&itemFilter(0).value=${storeName}`;
const respFormat = "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=true";
let entriesPerPage = `&paginationInput.entriesPerPage=`;
let pageNumber = `&paginationInput.pageNumber=`;

export default class Controls extends Component {

   Controls = observer(Controls)

   componentDidMount () {
      let url = `${baseUrl}${appID}${respFormat}${findInStore}`
      console.log("Loading Categories:")
      console.log(url)
      axios.get(url)
         .then( result => {
            const items = result.data.findItemsAdvancedResponse[0].searchResult[0].item;
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
      
      let url = `${baseUrl}${appID}${respFormat}${findInStore}`;
      url += `${entriesPerPage}${this.props.store.searchResults.resultsPerPage}`;
      url += `${pageNumber}${this.props.store.searchResults.page}`;
      
      if (this.props.store.searchResults.keyword !== "") {
         url += `&keywords=${this.props.store.searchResults.keyword}`
      }

      if (this.props.store.searchResults.currentCategory !== 'all') {
         url += `&categoryId=${this.props.store.searchResults.currentCategory}`
      }
      
      axios.get(url)
         .then( result => {
            if (result.data.findItemsAdvancedResponse[0].searchResult[0].item) {
               let items = result.data.findItemsAdvancedResponse[0].searchResult[0].item;
               this.props.store.insertItems(items)
               let pages = result.data.findItemsAdvancedResponse[0].paginationOutput[0].totalPages[0]
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

   render () {
      
      let page = parseInt(this.props.store.searchResults.page);
      let totalPages = parseInt(this.props.store.searchResults.totalPages);
      let pageArr = [];
      
      for (let i = 1; i <= 3; i++) {
         if (i <= totalPages) pageArr.push(i)
      }

      for (let i = -2; i < 3; i++) {
         if ((page + i) < totalPages && (page + i) > 3) {
            pageArr.push(page + i)
         }
      }

      for (let i = totalPages - 2; i <= totalPages; i++) {
         if ((i >= totalPages) && (i > pageArr[pageArr.length - 1])) pageArr.push(i)
      }
      
      console.log(pageArr)
      
      return (

         <div className='row container-fluid'>
            <div className='col-1 col-md-2 col-xl-3'></div>
            <div className='col-10 col-md-8 col-xl-6 m-4 form-group controls-container'>
            
               <div className='row'>
                  <label htmlFor='keyword' className='col-7'>Search Keyword (optional)</label>
                  <input   className='form-control col-5'
                           type='text'
                           id='searchByKey-input'
                           name='keyword'
                           placeholder='keyword'
                           onInput={this.handleChange} />
               </div>

               <div className='row'>
                  <label htmlFor='currentCategory' className='col-7'>Choose a Category (optional)</label>
                  <select  className='form-control col-5'
                           name='currentCategory'
                           onChange={this.handleChange} >
                     <option  value="all" >
                              All Categories
                     </option>
                     
                     { this.props.store.searchResults.categories ? (
                        this.props.store.searchResults.categories.map((category, index) => (
                           <option key={index} value={category.id}>{category.name}</option> ))
                     ):(
                        null )}
                  </select>
               </div>

               <div className='row'>
                  <label htmlFor='resultsPerPage' className='col'>Show {this.props.store.searchResults.resultsPerPage} Results Per Page</label>
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
                  <label htmlFor='page' className='col'>Page {page}</label>
                  <input   className='form-control col'
                           type='range'
                           min={1}
                           max={totalPages}
                           value={page}
                           id='pageNumber'
                           name='page'
                           placeholder='Page'
                           onChange={this.updatePage} />
               </div>

               <div className='row'>
                  {page <= 1 &&
                     <button  className='btn btn-secondary'
                              disabled >
                              prev</button> }
                                          
                  {page > 1 &&
                     <button  className='btn btn-primary'
                              value={page - 1}
                              onClick={this.updatePage} >
                              prev</button> }

                  { page >= totalPages &&
                     <button  className='btn btn-secondary'
                              disabled>
                              next</button> }
                     
                  { page < totalPages &&
                     <button  className='btn btn-primary'
                              value={page + 1}
                              onClick={this.updatePage} >
                              next</button> }
               </div>

               <div className='row'>
                  {pageArr.map((pageIdx) => { 
                     if (page === pageIdx) {
                        return(
                           <button  className='btn font-weight-bold'
                                    key={pageIdx}
                                    value={pageIdx}
                                    onClick={this.updatePage} >
                                    {pageIdx}</button> )}
                     else return (
                        <button  className='btn'
                                 key={pageIdx}
                                 value={pageIdx}
                                 onClick={this.updatePage} >
                                 {pageIdx}</button> )
                     })      
                  }
               </div>
               
               <button  className="btn btn-primary float-right"
                        type='submit'
                        id='searchByKey-btn'
                        onClick={this.searchByKey} >
                        Search</button>
            </div>
            <div className='col-1 col-md-2 col-xl-3'></div>
         </div>
      )
   }
}