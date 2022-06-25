import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Modal,Button,Form } from 'react-bootstrap';
import {Toaster,toast} from 'react-hot-toast';

const AddQualification = ({qualificationToggle,setQualificationToggle,refreshPage}) => {
  const [qualification,setQualification] = useState('');
  const [duration,setDuration] = useState('');
  const [percentage,setPercentage] = useState('');
  const [institution,setInstitution] = useState(0);
  
  const addNew = async (e) =>{
    e.preventDefault();
    let data = new FormData()
    try {
      data.append("institute",institution);
      data.append("qualification",qualification);
      data.append("duration",+duration);
      data.append("percentage",+percentage);
    
      let result = await axios(
        {
          method:"POST",
          url:`/api/experts/qualification`,
          data:{
            institute:institution,
            qualification:qualification,
            duration: +duration,
            percentage: +percentage
          }
        }
      );
      if(result.status===200) {
        toast.success('New Qualification added successfully.');
        setQualificationToggle(false);
        refreshPage();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
                <Form.Control required type="text" placeholder="Enter qualification"  className='m-2 rounded' onChange={(e)=>setQualification(e.target.value)} />
                <Form.Control required type="number" placeholder="Duration period" className='m-2 rounded' onChange={(e)=>setDuration(e.target.value)}/>
                <Form.Control required type="text" placeholder="Institute" className='m-2 rounded' onChange={(e)=>setInstitution(e.target.value)}/>
                <Form.Control required type="number" placeholder="Result percentage" className='m-2 rounded' onChange={(e)=>setPercentage(e.target.value)} />                
              </Form>
           

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setQualificationToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addFarmForm'>Submit</Button>
            </Modal.Footer>
          </Modal>
          <Toaster position='bottom-right' />
        </>
      );
    }
    
export default AddQualification