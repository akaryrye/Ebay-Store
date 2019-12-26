import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function About() {

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
      </Container>
   )
}