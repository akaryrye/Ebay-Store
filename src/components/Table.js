import React, { Component } from 'react';
import { observer } from "mobx-react"
import Alert from 'react-bootstrap/Alert';

export default class Table extends Component {

   Table = observer(Table)

   controlAlert = (show) => {
      this.props.store.updateSearchTerm('show', show)
   }

   render () {
      return (
         <div className="Table">
            <table>
            <thead>
               <tr>
                  <th>Name: </th>
                  <th>Daily Salary: </th>
               </tr>
            </thead>
            <tbody>
               {this.props.store.employeesList.map( (item, index) => 
               <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.salary}</td>
               </tr>
               )}
            </tbody>
            <tfoot>
               <tr>
                  <td>TOTAL = </td>
                  <td>{this.props.store.totalSum}</td>
               </tr>
            </tfoot>
            </table>
            <div>
               There are {this.props.store.highSalaries} employees with salaries greater than $350
            </div>
                  
            {this.props.store.searchResults.show &&
               <Alert show={this.props.store.searchResults.show} variant="danger">
                  <Alert.Heading>Hello?? ... Bootstrap??</Alert.Heading>
                  <p>This is a bootstrap test!!!</p>
                  <button onClick={() => this.controlAlert(false)}>Show Alert</button>
               </Alert>
            }
            
            {!this.props.store.searchResults.show &&
               <button onClick={() => this.controlAlert(true)}>Show Alert</button>
            }
            
         </div>
      )
   }
}