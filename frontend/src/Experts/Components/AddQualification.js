import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Modal,Button,Form } from 'react-bootstrap';

const AddQualification = ({qualificationToggle,setQualificationToggle}) => {
  const [qualification,setQualification] = useState('');
  const [duration,setDuration] = useState('');
  const [percentage,setPercentage] = useState('');
  const [institution,setInstitution] = useState(0);
  
  const addNew = async (e) =>{
    e.preventDefault();
    let data = new FormData()
    try {
      data.append("qualification",qualification);
      data.append("duration",+duration);
      data.append("institution",+institution);
      data.append("percentage",percentage);
    
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
            show={qualificationToggle}
            onHide={()=>setQualificationToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Add New Qualification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addFarmForm' onSubmit={addNew}>
                <Form.Control type="text" placeholder="Enter qualification"  className='m-2 rounded' onChange={(e)=>setQualification(e.target.value)} />
                <Form.Control type="text" placeholder="Duration period" className='m-2 rounded' onChange={(e)=>setDuration(e.target.value)}/>
                <Form.Control type="number" placeholder="Institute" className='m-2 rounded' onChange={(e)=>setInstitution(e.target.value)}/>
                <Form.Control type="text" placeholder="Result percentage" className='m-2 rounded' onChange={(e)=>setPercentage(e.target.value)} />                
              </Form>
           

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setQualificationToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addFarmForm'>Submit</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
export default AddQualification