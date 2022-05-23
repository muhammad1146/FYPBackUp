import React,{useState,useEffect} from 'react'
import { Container,Table,Button,Image, Col,Row,Card,CardGroup,Modal,Form} from 'react-bootstrap';
import AddExperience from './Ecommerce/AddExperience';
import { BiTrash } from "react-icons/bi";
import axios from 'axios';
import { useParams } from 'react-router';
import AddFarm from './Ecommerce/AddFarm';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ImCross } from 'react-icons/im';
const FarmerProfile = (props) => {
    console.log('reached farmerProfile in discussion')
    const history = useHistory();
    const {username} = useParams('username');
    const [farmToggle,setFarmToggle] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [addExperienceToggle,setAddExperienceToggle] = useState(false);
    const [picture,setPicture] = useState('');
    const [pictureToggle,setPictureToggle] = useState(false);
    const [farmerData,setFarmerData] = useState();
    const [updateInfoToggle,setUdpateInfoToggle] = useState(false);
    const refreshPage = () =>{
        setRefresh(prev=>!prev);
    }
const Experience =({farmerData})=>{
    const deleteExperience = async (id) =>{
    if(window.confirm('Are you sure want to delete this Experience?')){

        let result = await axios.delete(`/api/farmers/experiences/${id}`);
        if(result.status===200) {
            setAddExperienceToggle(false);
            alert('The experience deleted successfully.');
            refreshPage();
        }else{
            alert(`Request Failed with status code ${result.status}`);
        }
    }
    }
    return (
        <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Farming Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Position</th>
                    {props.user.uuid===username?(
                    <th>Delete</th>

                    ):null}
                    </tr>
                </thead>    
                <tbody>
                {
                    farmerData.FarmersExperiences.map(e=>{
                    let fromDate = new Date(e.from);       
                    let toDate = new Date(e.to);     
                       return( 
                        <tr>
                            <td>{e.farmingType}</td>
                            <td>{`${fromDate.getDate()}/${fromDate.getMonth()}/${fromDate.getFullYear()}`}</td>
                            <td>{`${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}`}</td>
                            <td>{e.position}</td>
                            {props.user.uuid===username?(
                            <td className='deleteIcon' style={{cursor:"pointer"}} onClick={()=>deleteExperience(e.id)}>
                            <BiTrash size='2rem'  /> 
                            </td>
                            ):null}
                        </tr>)
                })
                }
                    
                    
                </tbody>
        </Table>
    )
} 
const Farms = () =>{
    const deleteFarm = async (uuid) =>{
    if(!window.confirm('Are you sure want to Delete this Farm?')){
        return;
    }
        try {
            let result = await axios.delete(`/api/farmers/${props.user.uuid}/farms/${uuid}`);
            console.log(result);
            if(result.status===200){
                alert("Farm has been deleted Successfully.");
                refreshPage();

            }else{
            alert(`Request Failed with status code ${result.status}`);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <CardGroup>
      
  {(farmerData?.Farms.length>0)&& (farmerData.Farms.map(farm=>{
      return (
        <Card>
        {
        ((props.user.uuid===farmerData.uuid) &&
        (<Card.Header>
            <ImCross style={{float:'right',cursor:'pointer'}} size={"1rem"} onClick={()=>deleteFarm(farm.uuid)} />
        </Card.Header>))
        }
            <Link to={`/farmers/${username}/farms/${farm.uuid}`}>
            <Card.Img variant="top" src={''} />
            </Link>
            <Card.Body>
            <Card.Title>
            <Link to={`/farmers/${username}/farms/${farm.uuid}`}>
            {farm.farmName}
            </Link>
            </Card.Title>
            <Card.Text>
            Size:   {farm.farmSize}
            </Card.Text>
            <Card.Text>
            Cattle:   {farm.numberOfCattle}
            </Card.Text>
            <Card.Text>
            Farm Type :   {farm.farmingType}
            </Card.Text>
            <Card.Text>
            Location:   {farm.farmLocation}
            </Card.Text>

            </Card.Body>
            <Card.Footer>
            <small className="text-muted">started from: {farm.startDate}</small>
            </Card.Footer>
        </Card>
      )
  }))}
</CardGroup>
    )
}
const EditInfo = () =>{
    const [name,setName] = useState(farmerData.name);
    const [phoneNumber,setPhoneNumber] = useState(farmerData.phoneNumber);
    const [address, setAddress] = useState(farmerData.address);
    const [description,setDescription] = useState(farmerData.description);
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
          url:`/api/farmers/${username}`,
          data:{name,phoneNumber,address,description}
        }
      );
      if(result.status===200) {
            setUdpateInfoToggle(false);
            refreshPage();
      }else{
          alert(`Request Failed with status code ${result.status}`);
      }
    } catch (error) {
        alert(error.message);
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
              <Form.Control type="text" defaultValue={farmerData.name}  className='m-2 rounded' onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" defaultValue={farmerData.phoneNumber} className='m-2 rounded' onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </Form.Group>
              <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" defaultValue={farmerData.address} className='m-2 rounded' onChange={(e)=>setAddress(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3}  defaultValue={farmerData.description} onChange={(e)=>setDescription(e.target.value)}/>
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
            <tr>
            Profile Data
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Name</td>
                <td>{farmerData.name}</td>
            </tr>
            <tr>
                <td>Username</td>
                <td>{farmerData.userName}</td>
            </tr>
            <tr>
                <td>Phone Number</td>
                <td>{farmerData.phoneNumber}</td>
            </tr>
            <tr>
                <td>Status</td>
                <td>Farmer</td>
            </tr>
            
            <tr>
                <td>Address</td>
                <td>{farmerData.address}</td>
            </tr>
            
            <tr>
                <td>Description</td>
                <td>{farmerData.description}</td>
            </tr>

            <tr>
                <td>Rank</td>
                <td>{farmerData.FarmersRank.rankname}</td>
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
            let result =  await axios(
                {
                   method: "PUT",
                   url: `/api/farmers/${username}/picture`,
                   data: data,
                
                 });
         
            console.log("profileImage Result: ",result);
            if(result.status===200) {
                alert("Profile picture changed successfully");
                setPictureToggle(false);
                refreshPage();  
            }else{
          alert(`Request Failed with status code ${result.status}`);
            }
        
        } catch (error) {
            console.log("error from changePicture:",error);
        }
    }

    useEffect( async() =>{
    const result = await axios.get(`/api/farmers/${username}`);
    if(result.data!=null){
        setFarmerData(result.data);
    }else{
        setFarmerData(null);
    }
},[]);

useEffect( async() =>{
    const result = await axios.get(`/api/farmers/${username}`);
    if(result.data!=null){
        setFarmerData(result.data);
    }else{
        setFarmerData(null);
    }
},[refresh]);

    return (
    <Container className='p-4'>       
        <h2>
            {farmerData?.userName}
        </h2>
{farmerData!=null?(
<Row>
       <Col lg={8}>
      <Personal  />
        </Col>
        <EditInfo />
        <Col>

            <div className="">
                <Image src={farmerData.profileImage?`/${farmerData.profileImage}`:'/blankProfile.jpg'} rounded fluid width={"250px"} height={"250px"} />
            </div>
            <Button style={{display:`${props.user.uuid===username?'block':'none'}`}} onClick={()=>setPictureToggle(true)}> Change</Button>
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
                <Form.Control type="file" placeholder="Select file as profile image"  className='m-2 rounded' onChange={(e)=>setPicture(e.target.files[0])} />
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
        <div style={{display:`${props.user.uuid===username?'flex':'none'}`,justifyContent:'start',width:"100%",margin:'-15px 15px 20px 15px'}}>
        <Button  onClick={()=>setUdpateInfoToggle(true)}>Edit</Button>
        </div>
</Row>  ):(<h3>Loading...</h3>)}
        
<Row>
    <Col lg={6}>
        <h3> Experience</h3>
    </Col>
 {
     (props.user.uuid===farmerData?.uuid) &&(
    <Col lg={6} style={{display:'flex',justifyContent:'end'}}>
        <Button onClick={()=>setAddExperienceToggle(true)}>Add Experience</Button>
    </Col>
     )
 }
  <Row >
    <AddExperience addExperienceToggle={addExperienceToggle} setAddExperienceToggle={setAddExperienceToggle} refreshPage={refreshPage} />
  </Row> 
</Row>
{farmerData!=null?
(
<Row>
    <Col lg={8}>
        <Experience farmerData={farmerData} />
    </Col>
</Row>
):(<h3>Loading...</h3>)}


<Row>
    <AddFarm farmToggle={farmToggle} setFarmToggle={setFarmToggle} refreshPage={refreshPage} />

</Row>

<Row>
    <Col lg={6}>
    <h3>Farms</h3>
    {farmerData?.Farms?.length<1?(
            <h6>No farms</h6>
        ):(null)}
    </Col>
   {
       (props.user.uuid===farmerData?.uuid) &&(
    <Col lg={6} style={{display:'flex',justifyContent:'end'}}>
        <Button onClick={()=>setFarmToggle(true)}>Add Farm</Button>
    </Col>
       )
   }
</Row>
<Row>
<Farms farmerData={farmerData} />
</Row>


    </Container>
    )
}

export default FarmerProfile
