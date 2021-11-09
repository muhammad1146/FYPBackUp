import React, { useContext, useState } from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {Link } from 'react-router';
import {Form,Button,Col} from "react-bootstrap"
import UserContext from '../Contexts/UserContext'
const Login = () => {
const [user,setUser] = useContext(UserContext);
const [userType,setUsertype] = useState(null);
const [username,setUsername] = useState(null);
const [password, setPassword] = useState(null);

const handleRadioChange = (event) =>{
  setUsertype= event.target.value;
}
  const submitFunction  = (e) => 
  {
      e.preventDefault();
      const data ;
      if(userType!=null){

        try {
          data = axios(
            {
              method:'post',
              url:`localhost:5000/${userType}/login`,
              data: {
                userName: username,
                password:password
              }
            });   
          } catch (error) {
            alert(error);
          }
        }
        
      const token = data.token;
      const payload = jwt.verify(token,'secret');

      setUser(prev => ({
        ...prev,
        uuid:payload.uuid,
        type:payload.type,
        token
      }));

  }
  return (
  <Form onSubmit={submitFunction}>
    <Form.Group as={Row} controlId="formHorizontalEmail">
      <Form.Label column sm={2}>
        Username
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="email" placeholder="Email" onChange={(value)=>{
          setUsername=value;
        }} />
      </Col>
    </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalPassword">
      <Form.Label column sm={2}>
        Password
      </Form.Label>
      <Col sm={10}>
        <Form.Control type="password" placeholder="Password" onChange={(value)=>{
          setPassword=value;
        }} />
      </Col>
    </Form.Group>
    <fieldset>
      <Form.Group as={Row}>
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="Farmers"
            value= "farmers"
            name="formHorizontalRadios"
            onChange= {handleRadioChange}
            id="formHorizontalRadios1"
          />
          <Form.Check
            type="radio"
            label="Experts"
            value= "experts"
            name="formHorizontalRadios"
            id="formHorizontalRadios2"
            onChange={handleRadioChange}
          />
          <Form.Check
            type="radio"
            label="Admin"
            value="admin"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
            onChange={handleRadioChange}
          />
        </Col>
      </Form.Group>
    </fieldset>
    <Form.Group as={Row}>
      <Col sm={{ span: 10, offset: 2 }}>
        <Button type="submit">Sign in</Button>
       <Link to="/register"> 
       <Button >Register</Button> 
       </Link>
      </Col>
    </Form.Group>
  </Form>
  );
}

export default Login
