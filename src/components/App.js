import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Store from '../utils/store';
import Nav from './Nav';
import About from './About';
import Controls from './Controls';
import Table from './Table';
import Search from './Search';
import Footer from './Footer';
import Title from './Title';

const appStore = new Store();

export default class App extends Component {
  
   render () {
      return (
         <Router>
            <div className="app container-fluid">
               <Nav />
               <Title />
               
               <div className='row'>
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
               </div>

               <div className='row'>
                  <Footer />
               </div>
            </div>
         </Router>
      );
   }
}