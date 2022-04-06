import React,{useState,useEffect} from 'react'
import { Container,Table,Button,Image, Col,Row,Card,CardGroup,Modal,Form} from 'react-bootstrap';
import AddExperience from './Ecommerce/AddExperience';
import { BiTrash } from "react-icons/bi";
import axios from 'axios';
import { useParams } from 'react-router';
import AddFarm from './Ecommerce/AddFarm';
import { Link } from 'react-router-dom';
const FarmerProfile = ({user}) => {
    const {username} = useParams('username');
    const [farmToggle,setFarmToggle] = useState(false);
    const [addExperienceToggle,setAddExperienceToggle] = useState(false);
    const [farmerData,setFarmerData] = useState();
    const [updateInfoToggle,setUdpateInfoToggle] = useState(false);

const Experience =({farmerData})=>{
    const deleteExperience = (id) =>{

    }
    return (
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
                    farmerData.FarmersExperiences.map(e=>(
                        <tr>
                            <td>e.farmingType</td>
                            <td>e.from</td>
                            <td>e.to</td>
                            <td>e.position</td>
                            <td><BiTrash size='2rem' onClick={()=>deleteExperience(e.id)} /> </td>
                        </tr>
                    ))
                }
                    
                    
                </tbody>
        </Table>
    )
}
const Farms = () =>{
    return (
        <CardGroup>
  {(farmerData?.Farms.length>0)&& (farmerData.Farms.map(farm=>{
      return (
        <Card>
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
    const [name,setName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [description,setDescription] = useState('');
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
            <Button variant="primary" type='submit' form='addFarmForm'>Add Farm</Button>
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

    

    useEffect( async() =>{
    const result = await axios.get(`/api/farmers/${username}`);
    console.log(result)
    if(result.data!=null){
        setFarmerData(result.data);
    }else{
        setFarmerData(null);
    }
},[]);


    return (
    <Container className='p-4'>
       <Link to='/farmers'>
           <Button className="my-2 mt-0">
               Back
           </Button>
       </Link>
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
                <Image src={`/${farmerData.profileImage}`} rounded fluid width={"150px"} />
            </div>
        </Col>

</Row>  ):(<h3>Loading...</h3>)}
        <div style={{display:"flex",justifyContent:'end',width:"100%"}}>
        <Button  onClick={()=>setUdpateInfoToggle(true)}>Edit</Button>
        </div>
<Row>
    <Col lg={6}>
        <h3> Experience</h3>
    </Col>
 {
     (user.uuid===farmerData?.uuid) &&(
    <Col lg={6} style={{display:'flex',justifyContent:'end'}}>
        <Button onClick={()=>setAddExperienceToggle(true)}>Add Experience</Button>
    </Col>
     )
 }
  <Row >
    <AddExperience addExperienceToggle={addExperienceToggle} setAddExperienceToggle={setAddExperienceToggle} />
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
    <AddFarm farmToggle={farmToggle} setFarmToggle={setFarmToggle} />

</Row>

<Row>
    <Col lg={6}>
    <h3>Farms</h3>
    </Col>
   {
       (user.uuid===farmerData?.uuid) &&(
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
