import React, { useState, useEffect } from 'react'
import { Button, Form,Row,Col,Table } from 'react-bootstrap';

import axios from 'axios';
const ExpertQualification = () => {
    const [expertQualification, setExpertQualification] = useState([]);
    const [addForm, setAddForm] = useState(false);
    useEffect(() => {
        let data = axios.get();
        setExpertQualification(data);
        return () => {
          
        }
    }, []);
    const AddQualification = () => {
        const [qualification, setQualification] = useState('');
        const [duration, setDuration] = useState('');
        const [percentage, setPercentage] = useState('');
        const [institue, setInstitute] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            let data = axios.post()
            setExpertQualification(oldvalues => [

                ...oldvalues,{id:data.id,qualification,duration,percentage,institue}
            ])

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
        return (
            <>
               <Button onClick={handleAddForm} >
                  {addForm ? ('cancel') : ('Add New')}
               </Button> 
                {
                    addForm ? (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridQualification">
                <Form.Label>Qualification</Form.Label>
                <Form.Control type="text" placeholder="Enter Qualification Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Select defaultValue="1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridPercentage">
                <Form.Label>Percentage</Form.Label>
                <Form.Control placeholder="Enter Result Percentage" type="number" />
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridCityEnd">
                <Form.Label>Institution</Form.Label>
                <Form.Control  type="text" placeholder= "Enter Name of Instution" />
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
   
const handleDelete = (id) => {
   let array = [...expertQualification];
   let index = array.findIndex(x => x.id===id);
   if(index!==-1){
     array.splice(index,1);
     let data = axios.delete()
     if(data)
     {
         setExpertQualification(array);
     }
   }
    }
    const QualificationContainer = (expertQualification) => {
        return (
            <Row>
                Qualification
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                               
                                <th>Qualification</th>
                                <th>Duration</th>
                                <th>Percentage</th>
                                <th>Institution</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                           {expertQualification.map(row => {
                               return(

                            <tr>
                                <td>{row.Qualification}</td>
                                <td>{row.Duration}</td>
                                <td>{row.percentage}</td>
                                <td>{row.institue}</td>
                                <td>
                                <button onClick={()=> {handleDelete(row.id)}} className="deleteRow"  >Delete</button>
                                </td>
                            </tr>
                               )
                           }
                           )}
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
    return (
        <>
            <QualificationContainer expertQualification />    
            <AddQualification />
        </>
    )
}

export default ExpertQualification
