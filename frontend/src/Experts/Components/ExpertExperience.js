import React, { useState, useEffect } from 'react'
import { Form,Row,Col,Table,Button } from 'react-bootstrap';
import axios from 'axios';
const ExpertExperience = () => {
    const [expertExperience, setExpertExperience] = useState([]);
    const [institue, setInstitute] = useState('');
    const [position, setPostion] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [addForm ,setAddForm] = useState(false);
    useEffect(() => {
        let data = axios.get();
        setExpertExperience(data);
        return () => {
            
        }
    }, []);
        const handleSubmit = (e) => {
            e.preventDefault();

        }
        const handleDelete = (e) => {
            
        }
        const handleAddForm = () => {
            let current = addForm;
            if(current===false){
                setAddForm(true);
            }
            else{
                setAddForm(false)
            }
        }
    const ExperienceContainer = (expertExperience) => {
        return (
            <Row>
            Experience
            <Col>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Institute</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Position</th>
                            <th>Delete</th>
                            </tr>
                        </thead>    
                        <tbody>
                            {
                                expertExperience.map(item =>{
                            return(
                            <tr>
                            <td>{item.institue}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.position}</td>
                            <td>
                            <button onClick={()=> {handleDelete(item.id)}} className="deleteRow"  >Delete</button>
                                </td>
                            </tr>                            
                            )
                            })
                            }
                        </tbody>
                </Table>
            </Col>
        </Row>
        )
    }
    return (
        <>
            <ExperienceContainer expertExperience />
              
                <Button onClick={handleAddForm}>
                    {
                        addForm ?('cancel'):( 'Add New')
                    }
                </Button>
           {
            addForm ? (
        <Form onSubmit= {handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridInstitute">
                <Form.Label>Institute</Form.Label>
                <Form.Control type="text" placeholder="Enter Institute Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSizePosition">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" placeholder="Enter Position" />
                </Form.Group>
            </Row>



            <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridStart">
                <Form.Label>Start Date</Form.Label>
                <Form.Control placeholder="City Name etc" type="date" />
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridCityEnd">
                <Form.Label>End Date</Form.Label>
                <Form.Control  type="date"/>
            </Form.Group>

            </Row>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

               ):
               (null)
           }
        </>
    )
}
export default ExpertExperience
