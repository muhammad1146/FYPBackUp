import React from 'react'
import {Form, Row,Col,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const sellerForm = () => {
    return (      
      <>
<Link className='btn btn-dark m-4' to='/animals'> Back </Link>
<h2 className='text-center'>Sell Form</h2>
<Form className='py-4 my-4 px-2 mx-4' >
  <Row>    
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Price</Form.Label>
      <Form.Control placeholder="Price" />
      </Form.Group>
    </Col>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Weight</Form.Label>
      <Form.Control placeholder="Weight" />
      </Form.Group>
    </Col>
  </Row>
  <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Cattle Type</Form.Label>
        <Form.Control as="select">
            <option>Cow</option>
            <option>Bakra</option>
            <option>Sheep</option>
                
        </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> 
</>
)
}

export default sellerForm
