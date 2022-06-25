import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Modal,Button,Form,Row,Col,Image } from 'react-bootstrap';
import { ImCross } from "react-icons/im";
import { useParams } from 'react-router';
import {Toaster, toast} from 'react-hot-toast'; 

const AddFarm = ({farmToggle,setFarmToggle,refreshPage}) => {
  let {username} = useParams('username')
  const [farmName,setFarmName] = useState('');
  const [farmSize,setFarmSize] = useState('');
  const [farmLocation,setFarmLocation] = useState('');
  const [numberOfCattle,setNumberOfCattle] = useState(0);
  const [farmType,setFarmType] = useState('Cattle');
  const [image,setImage] = useState(null);
  const [imageURL,setImageURL] = useState(()=>{
    if(image!=null){
      return URL.createObjectURL(image)
    }else{
    return  null
    }
  });

  
  const AddNewFarm = async (e) =>{
    e.preventDefault();
    let data = new FormData()
    try {
      data.append("farmName",farmName);
      data.append("farmSize",+farmSize);
      data.append("numberOfCattle",+numberOfCattle);
      data.append("farmLocation",farmLocation);
      data.append("farmingType",farmType);
      
      let result = await axios(
        {
          method:"POST",
          url:`/api/farmers/${username}/farms`,
          data:data
        }
      );
      console.log(result);
      if(result.status===200){
        toast.success('Farm added successfully.')
        setFarmToggle(false);
        refreshPage();
      
      }else{
        toast.error('Failed with code: ', result.status)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
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
                <Form.Control type="number" placeholder="Enter Farm Size" className='m-2 rounded' onChange={(e)=>setFarmSize(e.target.value)}/>
                <Form.Control type="number" placeholder="Enter Number of Cattle" className='m-2 rounded' onChange={(e)=>setNumberOfCattle(e.target.value)}/>
                <Form.Control type="text" placeholder="Enter Farm Location" className='m-2 rounded' onChange={(e)=>setFarmLocation(e.target.value)} />
                <Form.Select  style={{width:"100%"}} className="m-2 p-2 rounded" name="farmType" onChange={(e)=>setFarmType(e.target.value)}>
                  <option disabled>select Farm Type</option>
                  <option>Cattle</option>
                  <option>Polutry</option>
                </Form.Select>
                
              
              </Form>
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