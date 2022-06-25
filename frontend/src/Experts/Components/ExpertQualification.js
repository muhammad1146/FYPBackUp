import React, { useState } from 'react'
import { Button, Form,Row,Col,Table,Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router';
import { BiTrash } from 'react-icons/bi';
import {Toaster,toast} from 'react-hot-toast';
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
              if(result.status===200){
                toast.success('New Qualification added successfully.');
              }else{
                toast.error('Request failed with status code ', result.status);
              }
            } catch (error) {
              console.log(error)
              toast.error(error.message);
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
                <Form.Control required type="text" placeholder="Qualification"  className='m-2 rounded' onChange={(e)=>setQualification(e.target.value)} />

                <Form.Select  style={{width:"100%"}} className="m-2 p-2 rounded" onChange={(e)=>setDuration(e.target.value)}>
                  <option disabled>Duration in Years</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Select>

                <Form.Group>
                <Form.Label> Result % </Form.Label>
                <Form.Control required type="number" className='m-2 rounded' onChange={(e)=> setPercentage (e.target.value)}/>
                </Form.Group>

                <Form.Control required type="text" placeholder="Institute"  className='m-2 rounded' onChange={(e)=>setInstitute(e.target.value)} />
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
  try {
    let result = await axios.delete(`/api/experts/qualification/${id}`);
    console.log(result);
    if(result.status) {
      toast.success('Qualification is deleted successfully.')
    }else{
      toast.error('Request is failed with status ', result.status);
    }
    
  } catch (error) {
    toast.error(error.message);
  }
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
                                <td>{row.qualification}</td>
                                <td>{row.duration}</td>
                                <td>{row.percentage}</td>
                                <td>{row.institution}</td>
                                <td className='deleteIcon' style={{cursor:"pointer"}}><BiTrash size='2rem' onClick={()=>handleDelete(row.id)} /> </td>
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
