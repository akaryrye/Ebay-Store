import React, { Component } from 'react';

export default class Controls extends Component {

   addEmployee = ()=> {
      const name = document.getElementById('inputName').value
      const salary = document.getElementById('inputSalary').value
      console.log(name + " : " + salary);
      this.props.store.insertOne({name, salary})
    }
  
    clearList = ()=> {
      this.props.store.clear()
    }

   render () {
      return (
         <div className="controls">
            <button onClick={this.clearList} >
            Clear Table
            </button>
            <input   id='inputName'
                     type='text'
                     placeholder='Name' />
            <input   id='inputSalary'
                     type='number'
                     placeholder='Salary' />
            <button onClick={this.addEmployee} >
            Add Record
            </button>
         </div>
      );
   }
}