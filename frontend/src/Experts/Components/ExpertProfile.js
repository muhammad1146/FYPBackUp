import React,{useState,useEffect} from 'react';
import { Container, Table,Image,Button,Row,Col,Modal,Form } from 'react-bootstrap';
import ExpertQualification from './ExpertQualification';
import { BiTrash } from "react-icons/bi";
import AddQualification from './AddQualification';
import AddExperience from './AddExperience';
import axios from 'axios';
import { useHistory,useParams } from 'react-router';
import {Toaster, toast} from 'react-hot-toast'; 
const ExpertProfile = (props) => {
    console.log('reached expert profile')
    const history = useHistory();
    const {username} = useParams('username');
    const [qualificationToggle,setQualificationToggle] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [addExperienceToggle,setAddExperienceToggle] = useState(false);
    const [picture,setPicture] = useState('');
    const [pictureToggle,setPictureToggle] = useState(false);
    const [updateInfoToggle,setUdpateInfoToggle] = useState(false);
    const refreshPage = () =>{
        setRefresh(prev=>!prev);
    }
    const [expertData,setExpertData] = useState();
    console.log('expertData: ',expertData );
    const Experience =()=>{
        const deleteExperience = async (id) =>{
            let result = await axios.delete(`/api/experts/experience/${id}`);
            if(result.status===200) {
                setAddExperienceToggle(false);
                toast.success('Expert Experience has been deleted successfully.');
                setRefresh(prev=>!prev);
            }else{
              toast.error(`Request failed with status code: ${result.status}`);

            }
        }
        return (
            <>
            {expertData?.ExpertExperiences?.length>0?
            (<Table striped bordered hover>
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
                        expertData?.ExpertExperiences.map(e=>{
                        let fromDate = new Date(e.startDate);       
                        let toDate = new Date(e.endDate);     
                           return( 
                            <tr>
                                <td>{e.institute}</td>
                                <td>{`${fromDate.getDate()}/${fromDate.getMonth()}/${fromDate.getFullYear()}`}</td>
                                <td>{`${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}`}</td>
                                <td>{e.position}</td>
                                <td className='deleteIcon' style={{cursor:"pointer"}}><BiTrash size='2rem' onClick={()=>deleteExperience(e.uuid)} /> </td>
                            </tr>)
                    })
                    }
                        
                        
                    </tbody>
            </Table>):(
                <Col>
                <p>No Experience</p>
                </Col>
            )

}
</>
        )
    }

    const EditInfo = () =>{
        const [name,setName] = useState(expertData.name);
        const [phoneNumber,setPhoneNumber] = useState(expertData.phoneNumber);
        const [address, setAddress] = useState(expertData.address);
        const [description,setDescription] = useState(expertData.description);
        const updateInfo = async(e) =>{
        e.preventDefault();
        let data = new FormData()
        try {
          data.append("name",name);
          data.append("phoneNumber",+phoneNumber);
          data.append("address",+address);
          data.append("description",description);
          let result = await axios(
            {
              method:"PUT",
              url:`/api/experts/${username}`,
              data:{name,phoneNumber,address,description}
            }
          );
          if(result.status===200) {
            toast.success('Profile data updated successfully.');
            setUdpateInfoToggle(false);
            setRefresh(true);
          }
        } catch (error) {
            toast.error(error.message);
        }    
        }
        return (
            <>   
            <Modal
              show={updateInfoToggle}
              onHide={()=>setUdpateInfoToggle(false)}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header >
                <Modal.Title>Update Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id='addFarmForm' onSubmit={updateInfo}>
                <Form.Group>
                <Form.Label>Name</Form.Label>
                  <Form.Control type="text" defaultValue={expertData.name}  className='m-2 rounded' onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" defaultValue={expertData.phoneNumber} className='m-2 rounded' onChange={(e)=>setPhoneNumber(e.target.value)}/>
                </Form.Group>
                  <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" defaultValue={expertData.address} className='m-2 rounded' onChange={(e)=>setAddress(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3}  defaultValue={expertData.description} onChange={(e)=>setDescription(e.target.value)}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=> setUdpateInfoToggle(false)}>
                Close
                </Button>
                <Button variant="primary" type='submit' form='addFarmForm'>Update</Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    }
    
    const Personal = () =>{
        return (
            <Table striped bordered hover size="sm" className='p-4'>
            <thead>
               
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{expertData.name}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>{expertData.userName}</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{expertData.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>Expert</td>
                </tr>
                
                <tr>
                    <td>Address</td>
                    <td>{expertData.address}</td>
                </tr>
                
                <tr>
                    <td>Description</td>
                    <td>{expertData.description}</td>
                </tr>
    
                <tr>
                    <td>Rank</td>
                    <td>{expertData.ExpertsRank.rankname}</td>
                </tr>
    
            </tbody>
        </Table>
        )
    }
    const changePicture =async (e) =>{
        e.preventDefault();
        let data = new FormData();
        data.append('profileImage',picture);
        try {
            console.log('fromData :',data.get('profileImage'));
            let result =  await axios(
                {
                   method: "PUT",
                   url: `/api/experts/${username}/picture`,
                   data: data,
                
                 });
         
            console.log("profileImage Result: ",result);
            if(result.status===200) {
                toast.success("Profile picture changed successfully");
                setPictureToggle(false);
                refreshPage();    
            }
        
        } catch (error) {
            console.log("error from changePicture:",error);
            toast.error('Error changing Profile Picture')
        }
    }
useEffect(async() =>{
    const result = await axios.get(`/api/experts/${username}`);
    setExpertData(result.data);
    console.log("result",result);
},[]);

useEffect(async() =>{
  const result = await axios.get(`/api/experts/${username}`);
  setExpertData(result.data);
  console.log("result",result);
},[refresh]);

    return (
        <Container className='p-4'>       
{expertData!=null?(
<Row>
       <Col lg={8}>
      <Personal  />
        </Col>
        <EditInfo />
        <Col>

            <div className="mb-3">
                <Image src={expertData.profileImage?`/${expertData.profileImage}`:'/blankProfile.jpg'} rounded fluid width={"250px"} height={"250px"} style={{maxWidth:'300px',maxHeight:'300px'}} />
            </div>
            <div className='w-100'>
            <Button style={{display:`${props.user.uuid===username?'block':'none'}`,margin:'auto'}} onClick={()=>setPictureToggle(true)}> Change </Button>
            </div>
            <Modal
            show={pictureToggle}
            onHide={()=>setPictureToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Change Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addExeprienceForm' onSubmit={changePicture}>
                <Form.Control accept='.png, .jpg, .jpeg' type="file" placeholder="Select file as profile image"  className='m-2 rounded' onChange={(e)=>setPicture(e.target.files[0])} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setPictureToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addExeprienceForm'>submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

</Row>  ):(<h3>Loading...</h3>)}
        <div style={{display:`${props.user?.uuid===username?'flex':"none"}`,justifyContent:'center',width:"60%",marginTop:'15px'}}>
        <Button  onClick={()=>setUdpateInfoToggle(true)}>Edit</Button>
        </div>
<Row>
    <Col lg={6}>
        <h3> Experience</h3>
    </Col>
 {
     (props.user.uuid===expertData?.uuid) &&(
    <Col lg={6} style={{display:`${props.user.uuid===username?'flex':"none"}`,justifyContent:'end'}}>
        <Button onClick={()=>setAddExperienceToggle(true)}>Add Experience</Button>
    </Col>
     )
 }
 </Row>
 <Row>
     <Experience />
 </Row>
  <Row >
    <AddExperience addExperienceToggle={addExperienceToggle} setAddExperienceToggle={setAddExperienceToggle} refreshPage={refreshPage} />
  </Row> 


<Row>
    <AddQualification qualificationToggle={qualificationToggle} setQualificationToggle={setQualificationToggle} refreshPage={refreshPage} />

</Row>

    <Row>
        <Col lg={6}>
        <h3>Qualifications</h3>
        </Col>
      {
          (props.user.uuid===expertData?.uuid) &&(
        <Col lg={6} style={{display:`${props.user.uuid===username?'flex':"none"}`,justifyContent:'end'}}>
            <Button onClick={()=>setQualificationToggle(true)}>Add Qualification</Button>
        </Col>
          )
      }
    </Row>
    <Row>
    <ExpertQualification expertData={expertData} />
    </Row>

    <Toaster position='bottom-right' />
    </Container>
    )
}

export default ExpertProfile
