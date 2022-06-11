import React, { useContext, useState } from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {Form,Button,Col,Row,FloatingLabel, Container,Image} from "react-bootstrap"
import { useHistory } from 'react-router';
import logo from '../data/LoginPNG.jpg'
const Login = ({setUser}) => {
  let history = useHistory();
const [userType,setUsertype] = useState("F");
const [username,setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const handleRadioChange = (event) =>{
  setUsertype(event.target.value);
}
  const onSubmitFunction  = async (e) => 
  {
      e.preventDefault();
      let result ;
      let url = (userType==='F')?'farmers' :'experts';
        try {
          let data =  JSON.stringify({userName:username,password});
          result = await axios({
              method:'post',
              headers: { 'Content-Type': 'application/json' },
              url:`api/${url}/login`, 
              data
            });   
            } catch (error) {
            console.log(error.response.data);  
            if(error.response.data.error){
              setError(error.response.data.error);

            }else{
              setError(error.response.data)
            }
              return;
          }
           const payload = jwt.verify(result.data.accessToken,'secret');
           setUser(payload);
              history.push('/discussion');
}
  
  return (
    <Container >
    <Row className="my-4">

    <Col lg={7} sm={5} xl={6}>
    <Image src={logo} alt="logo" fluid />
    </Col>
    <Col>
    <Form onSubmit={onSubmitFunction} >
    <h2 className='my-2 text-center'>Login</h2>
    <h5 className="text-danger">{error}</h5>
    <Container fluid className="my-4 border border-dark py-4" style={{borderRadius:'8px'}}>
    <fieldset className="p-2 m-3">
      <Form.Group as={Row}>
        <Col>
          <Form.Check
            type="radio"
            label="Farmers"
            value= "F"
            checked={userType==='E'?false:true}
            name="formHorizontalRadios"
            onChange= {handleRadioChange}
            id="formHorizontalRadios1"
          />
          </Col>
          <Col>
          <Form.Check 
            type="radio"
            label="Experts"
            value= "E"
            
            name="formHorizontalRadios"
            id="formHorizontalRadios2"
            onChange={handleRadioChange}
          />
          </Col>
      </Form.Group>
    </fieldset>
  <FloatingLabel
    controlId="floatingInput"
    label=""
    className="mb-3"
  >
  <Form.Control style={{borderRadius:'20px'}} type="text" placeholder="Username" onChange={(e)=>{
    setUsername(e.target.value)
        }} />
        
  </FloatingLabel>
    
    <FloatingLabel controlId="floatingPassword" label="">
    <Form.Control style={{borderRadius:'20px'}} type="password" placeholder="Password"  onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
  </FloatingLabel>
    
    
    
    <Form.Group as={Row}>
      <Col className='text-center' >
        <Button type="submit" style={{display:"block",margin:"auto",borderRadius:'25px'}} >Sign in</Button>
      </Col>
      {/* <Col style={{alignSelf:"center",textAlign:"center"}}>
        <Link to={'/register'} style={{color:"blue"}}>
          Register
        </Link> 
     </Col> */}
  
    </Form.Group>
    </Container>
  </Form>
  </Col>
    </Row>
    </Container>
  );
}

export default Login
