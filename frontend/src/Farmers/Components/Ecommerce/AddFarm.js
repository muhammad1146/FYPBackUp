import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Modal,Button,Form,Row,Col,Image } from 'react-bootstrap';
import { ImCross } from "react-icons/im";
import { useParams } from 'react-router';
const AddFarm = ({farmToggle,setFarmToggle}) => {
  let {username} = useParams('username')
  const [farmName,setFarmName] = useState('');
  const [farmSize,setFarmSize] = useState('');
  const [farmLocation,setFarmLocation] = useState('');
  const [numberOfCattle,setNumberOfCattle] = useState(0);
  const [farmType,setFarmType] = useState('');
  const [images,setImages] = useState([]);
 
  
  const AddNewFarm = async (e) =>{
    e.preventDefault();
    let data = new FormData()
    try {
      data.append("farmName",farmName);
      data.append("farmSize",+farmSize);
      data.append("numberOfCattle",+numberOfCattle);
      data.append("farmLocation",farmLocation);
      data.append("farmImages",images);
      data.append("farmingType",farmType);
      let result = await axios(
        {
          method:"POST",
          url:`/api/farmers/${username}/farms`,
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
            show={farmToggle}
            onHide={()=>setFarmToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Add New Farm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addFarmForm' onSubmit={AddNewFarm}>
                <Form.Control type="text" placeholder="Enter Name of Farm"  className='m-2 rounded' onChange={(e)=>setFarmName(e.target.value)} />
                <Form.Control type="text" placeholder="Enter Farm Size" className='m-2 rounded' onChange={(e)=>setFarmSize(e.target.value)}/>
                <Form.Control type="number" placeholder="Enter Number of Cattle" className='m-2 rounded' onChange={(e)=>setNumberOfCattle(e.target.value)}/>
                <Form.Control type="text" placeholder="Enter Farm Location" className='m-2 rounded' onChange={(e)=>setFarmLocation(e.target.value)} />
                <Form.Select  style={{width:"100%"}} className="m-2 p-2 rounded" onChange={(e)=>setFarmType(e.target.value)}>
                  <option disabled>select Farm Type</option>
                  <option>Cattle</option>
                  <option>Polutry</option>
                </Form.Select>
                <Form.Label className='m-2'>
                  Farm Images
                </Form.Label>
                <Form.Control type="file" size='sm' className='m-2 rounded' multiple onChange={(e)=>{
                  setImages([...e.target.files])
                }}/>
                
              </Form>
            <Row className='g-0'>
              {(images.length>0)&&
                (images.map(image=>{
                  let imageURL= URL.createObjectURL(image)
                return (
                  <Col lg={3}>
                  <div className='rounded border'>
                  <div className='d-flex justify-content-end '>
                  <div className="">
                  <ImCross size='1rem' onClick={()=>setImages(prev=>prev.filter(img=>img!=image))} className="p-1 " cursor={"pointer"}/>
                  </div>
                  </div>
                  
                  <Image src={imageURL} thumbnail  />
                  </div>
                  </Col>
                )
              }))
              }
            </Row>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setFarmToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addFarmForm'>Add Farm</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
export default AddFarm