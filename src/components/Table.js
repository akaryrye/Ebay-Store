import React, { Component } from 'react';
import { observer } from "mobx-react"

export default class Table extends Component {

   Table = observer(Table)

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
         </div>
      )
   }
}