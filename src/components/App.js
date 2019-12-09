import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//import { action, computed, decorate, observable, configure } from 'mobx';
//import { observer } from 'mobx-react';
//import axios from 'axios';
import Store from '../utils/store';

import Nav from './Nav';
import About from './About';
import Controls from './Controls';
import Table from './Table';
import Search from './Search';
import Footer from './Footer';

const appStore = new Store();

export default class App extends Component {
  
   render () {
      return (
         <Router>
            <div className="app">
               <Nav />
               <h1 className='title'>Sally's Fine Vintage Toys</h1>
               <Switch>
                  <Route path="/about">
                     <About />
                  </Route>
                  <Route path="/table">
                     <div className='table-container'>
                        <Controls store={appStore} />
                        <Table store={appStore} />
                     </div>
                  </Route>
                  <Route path="/search">
                     <Search store={appStore} />
                  </Route>
               </Switch>
               <Footer />
            </div>
         </Router>
      );
   }
}