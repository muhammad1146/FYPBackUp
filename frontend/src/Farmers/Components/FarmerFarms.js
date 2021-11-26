import React, { useState } from 'react'
import { Button,Card,Row,ListGroup,Form,Col,ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

const FarmerFarms = () => {
    const [farms, setFarms] = useState([]);
    const [AddForm,setAddForm] = useState(false);
    const [farmName, setFarmName] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [numberOfCattle, setNumberOfCattle] = useState(0);
    const [farmingType, setFarmingType] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setstartDate] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const handleAddForm = () => {
        let current = AddForm;
        if(current===false){
            setAddForm(true);
        }else{
            setAddForm(false)
        }
    }
    const FarmsContainer = ({farms}) => {
    return (
    <Row>
    {
    farms.map(farm => {
        return(
            <Col>
            <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Farm Name</Card.Title>
              <Card.Text>
                
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Number of Cattle</ListGroupItem>
              <ListGroupItem>Location</ListGroupItem>
              <ListGroupItem>Farm Size</ListGroupItem>
            </ListGroup>
          </Card>
            </Col>
                )})
            }
    </Row>        
        )
    }    
    return (
        <>
        <FarmsContainer farms /> 
        <Button onClick={handleAddForm} >
            {AddForm ? ('cancel') : ('Add Farm')}
        </Button>

        {
            AddForm ? (
        <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFarmName">
                <Form.Label>Farm Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Farm Name" onChange={(e)=>{setFarmName(e.target.value)}} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSize">
                <Form.Label>Farm Size</Form.Label>
                <Form.Control type="text" placeholder="Enter farm size in Marlas" onChange={(e)=>{setFarmSize(e.target.value)}}/>
            </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridCattle">
                    <Form.Label># of Cattle</Form.Label>
                    <Form.Control placeholder="100" type="number" onChange={(e)=>{setNumberOfCattle(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="City Name etc" type="text" onChange={(e)=>{setLocation(e.target.value)}} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control  type="date" onChange={(e)=>{setstartDate(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Farming Type</Form.Label>
                    <Form.Select defaultValue="Choose..." onChange={(e)=>{setFarmingType(e.target.value)}}>
                        <option>Cattle Farming</option>
                        <option>...</option>
                    </Form.Select>
                    </Form.Group>

                </Row>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Farm Images</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
        </Form>
            ): (null)
        }
        </>
    )
}

export default FarmerFarms
