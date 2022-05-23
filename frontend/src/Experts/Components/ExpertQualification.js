import React, { useState } from 'react'
import { Button, Form,Row,Col,Table,Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router';
const ExpertQualification = ({expertData}) => {
  const username = useParams('username');
    const [QualificationToggle,setQualificationToggle] = useState(false)
    const AddQualification = () => {
        const [qualification, setQualification] = useState('');
        const [duration, setDuration] = useState(0);
        const [percentage, setPercentage] = useState('');
        const [institution, setInstitute] = useState('');
        const addQualification = async (e) =>{
            e.preventDefault();
            let data = new FormData()
            try {
              data.append("qualification",qualification);
              data.append("duration",duration);
              data.append("percentage",percentage);
              data.append("institution",institution);
              let result = await axios(
                {
                  method:"POST",
                  url:`/api/experts/qualification`,
                  data:data
                }
              );
              console.log(result);
            } catch (error) {
              console.log(error)
            }
          }
        return (
            <>
               
               <Modal
            show={QualificationToggle}
            onHide={()=>setQualificationToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Add New Qualification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addQualification' onSubmit={addQualification}>
                <Form.Control type="text" placeholder="Qualification"  className='m-2 rounded' onChange={(e)=>setQualification(e.target.value)} />

                <Form.Select  style={{width:"100%"}} className="m-2 p-2 rounded" onChange={(e)=>setDuration(e.target.value)}>
                  <option disabled>Duration in Years</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Select>

                <Form.Group>
                <Form.Label> Result % </Form.Label>
                <Form.Control type="date" className='m-2 rounded' onChange={(e)=> setPercentage (e.target.value)}/>
                </Form.Group>

                <Form.Control type="text" placeholder="Institute"  className='m-2 rounded' onChange={(e)=>setInstitute(e.target.value)} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setQualificationToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addQualification'>Add Qualification
              </Button>
            </Modal.Footer>
          </Modal>
            </>
        )
    }
   
const handleDelete = async (id) => {
    let result = await axios.delete(`/api/experts/qualification/${id}`);
    console.log(result);
    }
    const QualificationContainer = () => {
        return (
            <>
                <Col>
                {expertData?.ExpertQualifications?.length>0?(
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
                           
                           {expertData?.ExpertQualifications.map(row => {
                               return(

                            <tr>
                                <td>{row.Qualification}</td>
                                <td>{row.Duration}</td>
                                <td>{row.percentage}</td>
                                <td>{row.institution}</td>
                                <td>
                                <button onClick={()=> {handleDelete(row.id)}} className="deleteRow"  >Delete</button>
                                </td>
                            </tr>
                               )
                           }
                           )}
                            
                        </tbody>
                    </Table>
                ):
                (
                  <p>No qualification</p>
                )}
                    
                </Col>
                <Button style={{display:`${expertData?.uuid===username?'block':'none'}`}} onClick={()=>setQualificationToggle(true)}>Add Qualification</Button>
            </>
        )
    }
    return (
        <>
            <QualificationContainer  />    
            <AddQualification />
        </>
    )
}

export default ExpertQualification
