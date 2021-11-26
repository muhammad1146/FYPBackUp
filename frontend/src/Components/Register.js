import React,{useState} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';

// import FloatingLabel from "react-bootstrap-floating-label";
import { Form,Button,FloatingLabel,Badge ,Container,Row,Col,Card   } from 'react-bootstrap';
const Register = () => {
    const [userType, setUserType] = useState('f');
    
    const ExpertRegisterForm = () => {
      let history = useHistory();
      const [name,setName] = useState('');
      const [userName,setuserName] = useState('');
      const [password,setPassword] = useState('');
      const [address,setAddress] = useState('');
      const [experties,setExperties] = useState([]);
      const [number,setNumber] = useState('');
      const [error, setError] = useState(null);

      const Login = async (e) => {
        e.preventDefault();
        let result;
        try {
          let data = JSON.stringify({

            name,userName,password,address,phoneNumber:number,experties
          });
          result = await axios({
            method:'post',
              headers: { 'Content-Type': 'application/json' },
              url:'api/experts',
              data
          })
        } catch (error) {
          setError(error.response.data)
          return;
        }
        console.log(result);
        if(result){

          history.push('/login');
        }

      }
      return (
        <>
        <span>{error}</span>
        <Form onSubmit={Login}>
          <Container className='border border-dark my-3 p-4'>
            <FloatingLabel
            controlId="floatingInputName"
            label=""
            className="mb-3">
            <Form.Control type="text" placeholder="Name" onChange={(e)=>{
              setName(e.target.value);
            }} />
          </FloatingLabel>
                
          <FloatingLabel
            controlId="floatingInputUsername"
            label=""
            className="mb-3">
            <Form.Control type="text" placeholder="Username" onChange={(e)=>{
              setuserName(e.target.value);
            }} />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputPassword"
            label=""
            className="mb-3">
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{
              setPassword(e.target.value);
            }}  />
          </FloatingLabel>
                
          <FloatingLabel
            controlId="floatingInputAddress"
            label=""
            className="mb-3">
            <Form.Control type="text" placeholder="Address" onChange={(e)=>{
              setAddress(e.target.value);
            }} />
          </FloatingLabel>
          
          <FloatingLabel
            controlId="floatingInputExperties"
            label="Experties"
            className="mb-3">
          </FloatingLabel> 
          <Card>
            <Card.Body className='p-0'>{experties.map((item)=>{
                    return (<Badge bg="danger" className='border rounded'>{item}</Badge>)
            })}
            </Card.Body>
          </Card>
          <Form.Select id="inlineFormCustomSelect" className='w-100 mb-3'  onChange={(e)=>{
           let value = e.target.value;
           if(experties.indexOf(value)!==-1 || value==='0'){
             return;
           }
           else{
            setExperties(prev =>[...prev,value])
           }
          }}>
        <option  value="0" >Choose</option>
        <option  value="Breeding" >Breeding</option>
        <option value="Veternity">Veternity</option>
        <option value="nutritionist">nutritionist</option>
        
      </Form.Select>
          
          <FloatingLabel
            controlId="floatingInputContact"
            label=""
            className="mb-3 mt-2">
            <Form.Control type="text" placeholder="Contact Number" onChange={(e)=>{
              setNumber(e.target.value);
            }} />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
              Submit
          </Button>
          </Container>
       </Form>
       </>
        )
    }

    const FarmerRegisterForm = ( ) => {
      const history = useHistory();
      const [name,setName] = useState('');
      const [userName,setuserName] = useState('');
      const [password,setPassword] = useState('');
      const [address,setAddress] = useState('');
      const [farmingType,setFarmingType] = useState('');
      const [number,setNumber] = useState('');
      const [error,setError] = useState(null);

      const Login = async (e) => {
        e.preventDefault();
        let result;
        try {
          let data = JSON.stringify({

            name,userName,password,address,phoneNumber:number,farmingType
          });
          result = await axios({
            method:'post',
              headers: { 'Content-Type': 'application/json' },
              url:'api/farmers',
              data
          })
        } catch (error) {
          setError(error.response.data)
          return;
        }
        console.log(result);
        if(result){

          history.push('/login');
        }
      }
    return (
      <>
      <span>{error}</span>
          <Form onSubmit={Login} className='text-white'>
            <Container className='border border-dark my-3 px-2 py-4 bg-dark'>
        
           <FloatingLabel
            controlId="floatingInputName"
            label=""
            className="mb-3">
            <Form.Control type="text" placeholder="Name" onChange={(e)=>{
              setName(e.target.value);
            }} />
          </FloatingLabel>
                
          <FloatingLabel
            controlId="floatingInputUsername"
            label=""
            className="mb-3">
            <Form.Control type="text" placeholder="Username" onChange={(e)=>{
              setuserName(e.target.value);
            }} />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputPassword"
            label=""
            className="mb-3">
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{
              setPassword(e.target.value);
            }}  />
          </FloatingLabel>
                
          <FloatingLabel
            controlId="floatingInputAddress"
            label=""
            className="mb-0">
            <Form.Control type="text" placeholder="Address" onChange={(e)=>{
              setAddress(e.target.value);
            }} />
          </FloatingLabel>
          
          
            <FloatingLabel
              controlId="floatingInputContact"
              label=""
              className="my-3 ">
              <Form.Control type="text" placeholder="Contact Number"  onChange={(e)=>{
              setNumber(e.target.value);
            }}  />
            </FloatingLabel>  
          
           <FloatingLabel controlId="floatingSelect" label="Farming Type" placeholder='' >
            </FloatingLabel>
           <Form.Select aria-label="Farming Type" onChange={(e)=> setFarmingType(e.target.value) } className='w-100 mb-2' >
                <option>Cattle</option>
                <option value="1">Poultry</option>
            </Form.Select>
             <Row>
              <Col className='text-center'>

              <Button variant="primary" type="submit" className='center'>
                  Submit
              </Button>
              </Col>
             </Row>
            </Container>
        </Form>
      </>

        )
    }
    return(
        <>
        <Form>
        <Card className='mt-3'>
        <h2 className='text-center mt-3'>
       {userType==='f'?('Farmer'):('Expert')} Register Form
        </h2>
        <Card.Body className='text-center'>
        <Button className='mx-3' variant={userType==='f'?('pills'):'secondary'} onClick={(e)=>{
            if(userType==='f'){
              return;
            }
            else{
              setUserType('f');
            }  
        }}>
        Farmers</Button>

      <Button  variant={userType==='e'?('pills'):'secondary'} onClick={()=>{
            if(userType==='e'){

              return;
            }
            else{
              setUserType('e');
            }  
        }}>
        Experts</Button>
      
      
        </Card.Body>

        </Card>
        </Form>
    {userType==='f' ? <FarmerRegisterForm /> : <ExpertRegisterForm /> }
    </>
)
}

export default Register
