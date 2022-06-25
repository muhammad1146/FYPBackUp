import axios from 'axios';
import React, { useState } from 'react'
import { Modal,Button,Form } from 'react-bootstrap';
import {Toaster, toast } from 'react-hot-toast';
const AddExperience = ({addExperienceToggle,setAddExperienceToggle,refreshPage}) => {
  const [institute,setInstitute] = useState('');
  const [position,setPostion] = useState('');
  const [from,setFrom] = useState(0);
  const [to,setTo] = useState('');
 
  
  const addExperiece = async (e) =>{
    e.preventDefault();
    try {
      let result = await axios(
        {
          method:"POST",
          url:`/api/experts/experience`,
          data:{institute,position,from,to}
        }
      );
      console.log(result);
      if(result.status===200){
        toast.success("New Experience Added Successfully.");
        setAddExperienceToggle(false);
        refreshPage();

      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }
  return (
        <>   
          <Modal
            show={addExperienceToggle}
            onHide={()=>setAddExperienceToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>New experience</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addExeprienceForm' onSubmit={addExperiece}>
                <Form.Control required  type="text" placeholder="Enter Your held Postion"  className='m-2 rounded' onChange={(e)=>setPostion(e.target.value)} />
                <Form.Group>
                <Form.Label style={{marginLeft:'12px', marginBottom:'0'}}> Started from </Form.Label>
                <Form.Control required type="date"  className='m-2 rounded' onChange={(e)=>setFrom(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                <Form.Label style={{marginLeft:'12px', marginBottom:'0'}}> Till </Form.Label>
                <Form.Control required type="date" className='m-2 rounded' onChange={(e)=> setTo (e.target.value)}/>
                </Form.Group>
                <Form.Group>
                <Form.Label style={{marginLeft:'12px', marginBottom:'0'}}> Institute </Form.Label>
                <Form.Control required type="text" className='m-2 rounded' onChange={(e)=> setInstitute (e.target.value)}/>
                </Form.Group>
            
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setAddExperienceToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addExeprienceForm'>Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
export default AddExperience;