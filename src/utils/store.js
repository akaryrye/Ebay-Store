import { action, computed, decorate, observable, configure } from 'mobx';
configure({enforceActions: true})

export default class Store {
   
   employeesList = [
      {name: "John Doe", salary: 150},
      {name: "Ryan Alldrin", salary: 200}
   ]
   
   searchResults = {
      keyword: "",
      category: "",
      items: ""
   }

   insertItems(items) {
      console.log('adding items to store')
      console.log(items)
      this.searchResults.items = items
   }

   updateSearchTerm(key, value) {
      this.searchResults[key] = value
   }

   clear() {
      this.employeesList = []
   }

   insertOne(newEmployee) {
      this.employeesList.push(newEmployee)
   }

   get totalSum() {
      let sum = 0
      this.employeesList.map( e => sum = sum + parseInt(e.salary))
      return sum
   }

   get highSalaries() {
      return this.employeesList.filter( e => e.salary > 350).length
   }
}

decorate(Store, {
   employeesList: observable,
   searchResults: observable,
   insertItems: action,
   updateSearchTerm: action,
   clear: action,
   insertOne: action,
   totalSum: computed
})