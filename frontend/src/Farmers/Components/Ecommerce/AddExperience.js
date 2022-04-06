import axios from 'axios';
import React, { useState } from 'react'
import { Modal,Button,Form } from 'react-bootstrap';
const AddExperience = ({addExperienceToggle,setAddExperienceToggle}) => {
  const [farmingType,setFarmingType] = useState('cattle');
  const [position,setPostion] = useState('');
  const [from,setFrom] = useState(0);
  const [to,setTo] = useState('');
 
  
  const addExperiece = async (e) =>{
    e.preventDefault();
    let data = new FormData()
    try {
      data.append("farmingType",farmingType);
      data.append("position",position);
      data.append("from",from);
      data.append("to",to);
      let result = await axios(
        {
          method:"POST",
          url:`/api/farmers/experiences`,
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
            show={addExperienceToggle}
            onHide={()=>setAddExperienceToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Add New Farm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addExeprienceForm' onSubmit={addExperiece}>
                <Form.Control type="text" placeholder="Enter Your held Postion"  className='m-2 rounded' onChange={(e)=>setPostion(e.target.value)} />
                <Form.Group>
                <Form.Label> Started from </Form.Label>
                <Form.Control type="date"  className='m-2 rounded' onChange={(e)=>setFrom(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                <Form.Label> Till </Form.Label>
                <Form.Control type="date" className='m-2 rounded' onChange={(e)=> setTo (e.target.value)}/>
                </Form.Group>

                <Form.Select  style={{width:"100%"}} className="m-2 p-2 rounded" onChange={(e)=>setFarmingType(e.target.value)}>
                  <option disabled>select Farming Type</option>
                  <option>Cattle</option>
                  <option>Polutry</option>
                </Form.Select>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setAddExperienceToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addExeprienceForm'>Add Experience
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
export default AddExperience;