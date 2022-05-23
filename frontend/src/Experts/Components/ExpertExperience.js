import axios from 'axios';
import React, { useState } from 'react'
import { Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import { BiTrash } from "react-icons/bi";
const ExpertExperience = ({expertData}) => {
  const [farmingType,setFarmingType] = useState('cattle');
  const [position,setPostion] = useState('');
  const [from,setFrom] = useState(0);
  const [to,setTo] = useState('');
  const [experienceToggle,setExperienceToggle] = useState(false);
  const deleteExperience = async(id) =>{
      let result = await axios.delete(`/api/experts/experience/${id}`);
      console.log(result);
  }
  const addExperience = async (e) =>{
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
          url:`/api/experts/experiences`,
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
          <Row>
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
                    expertData?.ExpertExperiences.map(e=>(
                        <tr>
                            <td>{e.farmingType}</td>
                            <td>{e.from}</td>
                            <td>{e.to}</td>
                            <td>{e.position}</td>
                            <td><BiTrash size='2rem' onClick={()=>deleteExperience(e.id)} /> </td>
                        </tr>
                    ))
                }
                    
                    
                </tbody>
        </Table>
        <Button  onClick={()=>setExperienceToggle(true)}>New Experience</Button>
        </Row>
        </>
      );
    }
    
export default ExpertExperience;