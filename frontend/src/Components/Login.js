import React, { useContext, useState } from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {Form,Button,Col,Row,FloatingLabel, Container} from "react-bootstrap"
import {UserContext} from '../Contexts/UserContext'
import { useHistory } from 'react-router';
const Login = () => {
  let history = useHistory();
const {user,setUser} = useContext(UserContext);
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
              
              setError(error.response.data);
              return;
          }
             const payload = jwt.verify(result.data,'secret');
           
           setUser(prev => ({
                 ...prev,
                uuid:payload.uuid,
               type:payload.userType,
                token:result.data
              }));
              history.push('/')
              
          
}
  
  return (
    <Form onSubmit={onSubmitFunction} >
    <h2 className='my-2 text-center'>Login</h2>
    <h5 className="text-danger">{error}</h5>
    <Container fluid className="my-4 border border-dark py-4">
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
          {/* <Col>
          <Form.Check
            type="radio"
            label="Admin"
            value="a"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
            onChange={handleRadioChange}
          />
        </Col> */}
      </Form.Group>
    </fieldset>
  <FloatingLabel
    controlId="floatingInput"
    label=""
    className="mb-3"
  >
  <Form.Control type="text" placeholder="Username" onChange={(e)=>{
    setUsername(e.target.value)
   
        }} />
        
  </FloatingLabel>
    {/* <Form.Group as={Row} controlId="formHorizontalEmail">
      <Form.Label>
        Username
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="email" placeholder="Email" onChange={(value)=>{
          setUsername=value;
        }} />
      </Col>
    </Form.Group> */}
  {/* <Form.Group as={Row} controlId="formHorizontalPassword">
      <Form.Label >
        Password
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="password" placeholder="Password" onChange={(value)=>{
          setPassword=value;
        }} />
      </Col>
    </Form.Group> */}
    <FloatingLabel controlId="floatingPassword" label="">
    <Form.Control type="password" placeholder="Password"  onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
  </FloatingLabel>
    
    
    
    <Form.Group as={Row}>
      <Col className='text-center' >
        <Button type="submit" >Sign in</Button>
      </Col>
    </Form.Group>
    </Container>
  </Form>
  );
}

export default Login
