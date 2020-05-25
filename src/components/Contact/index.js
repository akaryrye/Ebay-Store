import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Row from 'react-bootstrap/Row';
import './../Contact/contact.css';

export default class MyForm extends Component {

  MyForm = observer(MyForm)

  updateStatus = (val) => {
    this.props.store.updateSearchTerm("emailStatus", val);
  }

  submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.updateStatus("SUCCESS")
      } else {this.updateStatus("ERROR") }
    };
    xhr.send(data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}
              method={"POST"}
              action={"https://formspree.io/mlepjdqz"}
              className="contactForm" >
          
          <Row className='justify-content-center'>
            <input  type="email"
                    name="email"
                    placeholder="email address"
                    className="col-6 my-3 formEmail"/>
          </Row>
          <Row className='justify-content-center'>
            <textarea  type="text"
                      name="message"
                      placeholder="type your message here"
                      className="col-8 my-3 text-align-left formMessage" />
          </Row>
          <Row className='justify-content-center'>
            {this.props.store.searchResults['emailStatus'] === "SUCCESS" ? 
              <div><button>Submit</button><hr/><p>Thanks!</p></div> : <div><button>Submit</button><hr/></div>}
            {this.props.store.searchResults['emailStatus'] === "ERROR" && 
              <p>Ooops! There was an error.</p>}
          </Row>
        </form>
      </div>
    );
  }
}