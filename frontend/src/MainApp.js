import React,{useContext, useEffect, useState} from 'react'

import {Container,Row,Col,Nav,Button,} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';
import { useHistory } from 'react-router-dom';
import MainContainer from './MainContainer';
const MainApp = () => {
  const {user,setUser} = useContext(UserContext);
  console.log(user)
  let history = useHistory();
                          const MainHeader = ({type}) => {
                            let history = useHistory();
                          if(type==='E'){
                            return(
                              <>
                            <Nav justify variant="tabs" defaultActiveKey="/discussion" className='w-100'>
                              <Nav.Item as={Button} className='text-white w-100'>
                                <Nav.Link as={Link} to="/discussion"  className='border-dark'>Discussion</Nav.Link>
                              </Nav.Item>
                              <Nav.Item className='text-white w-100'>
                                <Nav.Link as={Link} to="/blogs" className='border-dark'>Blogs</Nav.Link>
                              </Nav.Item>
                            </Nav>
                              </>
                          )
                          }
                          else if(type==='F')
                          {
                            return(
                              <div className=''>

                              <Nav justify variant="tabs" defaultActiveKey="/discussion" className='w-100'>
                              <Row className='w-100'>
                              <Col  lg={4} >
                              <Nav.Item as={Button} className='w-100'>
                                <Nav.Link as={Link} to="/discussion" className='border-dark primary w-100 text-white'>Discussion</Nav.Link>
                              </Nav.Item>
                              </Col>
                              <Col lg={4} >
                              <Nav.Item className='w-100' as={Button}>
                                <Nav.Link as={Link} to="/blogs" className='border-dark w-100 text-white'>Blogs</Nav.Link>
                              </Nav.Item>
                              </Col>
                              <Col lg={4} >
                              <Nav.Item className='w-100' as={Button} >
                                <Nav.Link as={Link} to="/ecommerce" className='border-dark w-100 text-white'>Ecommerce</Nav.Link>
                              </Nav.Item>
                              </Col>
                              </Row>
                            </Nav>
                              </div>
                            )
                          }
                          else if(type==='A'){

                          }
                          else {
                            console.log('Header redirecting to /login')
                            history.push('/login');
                          }
                          }       
        if(user.uuid){  // logged in
        let type= user.type;
            return(   
              <Container className='bg-dark' fluid>
              <MainHeader type={type} />
              <MainContainer />
              </Container>
            ) 
      }
        else{ //not logged in
        
        
        history.push('/login');
        return (
          <>
          </>
        )
      }
}


export default MainApp;