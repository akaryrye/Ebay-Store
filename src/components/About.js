import React, { Component } from 'react';
import MyForm from './Contact/index';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class About extends Component {

  render() {
    return (
      <Container className='about'>
        <Row>
          <Col>
            <Jumbotron fluid>
              <h2>About</h2><hr/>
              <p>This could be a paragraph describing what the site is all about!!.  It could even contain pictures.</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron fluid>
              <h2>Contact Me</h2><hr/>
              <MyForm store={this.props.store} />
              </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
}
