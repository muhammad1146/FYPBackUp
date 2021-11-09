 import React from 'react'
 import {Form,Row,Col,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
 import '../App.css'
const Login = () => {

    return (
        
            
        <Form className='py-4 bg-secondary' id='mainForm'>
    <Form.Group as={Row} className='mx-auto text-center' >
    
      <Col>
        <Form.Check
            checked
          type="radio"
          label="Farmer"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          block
          className='border px-4 py-2'
          />
        </Col>
        <Col>
        <Form.Check
          type="radio"
          label="Vet"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          inline
          className='border px-4 py-2'
          />
          </Col>
          <Col>
        <Form.Check
        
          type="radio"
          label="Admin"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
          inline
          className='border px-4 py-2'
          />
      </Col>
    </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalEmail" className='m-auto text-center'>
    <Col >
      <Form.Control type="email" placeholder="Username/email" className='my-4 py-4' required />
    </Col>
  </Form.Group >

  <Form.Group className='mx-auto' as={Row} controlId="formHorizontalPassword" >
    
    <Col >
      <Form.Control type="password" placeholder="Password"  className='my-4 py-4' required/>
    </Col>
  </Form.Group>
  <fieldset>
    
  </fieldset>
  

  <Form.Group as={Row} className='ml-auto ml-4'>
    <Col>
      <Button type="submit" variant='secondary' className='mr-4'>Sign in</Button>
      
     <LinkContainer to='/register'>
      <Button  variant='secondary' className='ml-4'>Register</Button>
     </LinkContainer>
    </Col>
  </Form.Group>
</Form>
          
    )
}

export default Login
