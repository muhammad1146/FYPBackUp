import React,{useContext, useEffect, useState} from 'react'
import jwt from 'jsonwebtoken';
import {Container,Row,Col,Nav,Button,} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import MainContainer from './MainContainer';
const MainApp = ({user,setUser}) => {
  // const [user,setUser] = useState({payload});
  // console.log("rendered from mainApp");
 

  
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
                                <Nav.Link as={Link} to="/discussion/" className='border-dark primary w-100 text-white'>Discussion</Nav.Link>
                              </Nav.Item>
                              </Col>
                              <Col lg={4} >
                              <Nav.Item className='w-100' as={Button}>
                                <Nav.Link as={Link} to="/blogs/" className='border-dark w-100 text-white'>Blogs</Nav.Link>
                              </Nav.Item>
                              </Col>
                              <Col lg={4} >
                              <Nav.Item className='w-100' as={Button} >
                                <Nav.Link as={Link} to="/ecommerce/all" className='border-dark w-100 text-white'>Ecommerce</Nav.Link>
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

                            return(
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
                            )
                          }
                          }       
        if(Cookies.get("accessToken") || Cookies.get('refreshToken')){  // logged in 
          if(!user.type && Cookies.get('refreshToken')){
            let payload = jwt.verify(Cookies.get('refreshToken'),"refreshSecret");
            console.log(payload)
            setUser(payload);
          }
        let type= user.type;
            return(   
            
              <>

              {/* <MainHeader type={type} /> */}
              <MainContainer user={user} setUser={setUser} />
              </>
            
            ) 
      }
        else{
        history.push('/login');
        return (
          <>
          </>
        )
      }
}


export default MainApp;