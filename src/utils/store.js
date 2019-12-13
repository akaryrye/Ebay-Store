import { action, computed, decorate, observable, configure } from 'mobx';
configure({enforceActions: true})

export default class Store {
   
   employeesList = [
      {name: "John Doe", salary: 150},
      {name: "Ryan Alldrin", salary: 200}
   ]
   
   searchResults = {
      keyword: "",
      currentCategory: "all",
      page: "1",
      categories: [],
      showModal: false,
      items: ""
   }

   insertItems = (items) => {
      console.log('adding items to store')
      console.log(items)
      this.searchResults.items = items
   }

   insertCategory (category) {
      let found = false;
      for (let i = 0; i < this.searchResults.categories.length; i++) {
         if (category.id === this.searchResults.categories[i].id) {
            found = true;
            break;
         }
      }
      if (found === false) this.searchResults.categories.push(category)
   }

   updateSearchTerm(key, value) {
      this.searchResults[key] = value
   }

   currentItem (index) {
      if (this.searchResults.items[index]) {
         this.searchResults.currentItem = this.searchResults.items[index]
         this.toggleModal()
      }
   }

   toggleModal () {
      this.searchResults.showModal = !this.searchResults.showModal
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
   insertCategory: action,
   updateSearchTerm: action,
   currentItem: action,
   toggleModal: action,
   clear: action,
   insertOne: action,
   totalSum: computed
})