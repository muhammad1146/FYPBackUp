import React,{useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container,Form,Button,FormControl,Row,Col, NavDropdown  } from 'react-bootstrap';
import { FaSignInAlt,FaShoppingCart  } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiTalk } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom';
const Header = () => {
  

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [UserType, setUserType] = useState('farmer');
if (!isLoggedIn){
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
    <LinkContainer to='/'>
      <Navbar.Brand> <GiTalk size='1.4rem' className='pr-1'/>CATTLETALK</Navbar.Brand>
    </LinkContainer>
      
    <Form >
      <Row>
        <Col >
      <FormControl type="text" placeholder="Search" className="mr-sm-2" inline />
        </Col>
        <Col lg='2'>
      <Button variant="outline-success" className='' >Search</Button>
        </Col>
      </Row>
    </Form>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="ml-auto">
    <LinkContainer to='/login'> 
      <Nav.Link ><FaSignInAlt size='1.2rem' className='pr-1'/>LogIn</Nav.Link>
    </LinkContainer>
    <LinkContainer to='/profile'>
      <Nav.Link><CgProfile size='1.2rem' className='pr-1'/>Profile</Nav.Link>
    </LinkContainer>
    <LinkContainer to='/animals'>
      <Nav.Link >
        <FaShoppingCart size='1.2rem' className='pr-1 '/>Ecommerce
        </Nav.Link>
    </LinkContainer>
  </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
    }
    else if(isLoggedIn && UserType === 'farmer'){
     return (
        <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
        <LinkContainer to='/'>
          <Navbar.Brand> <GiTalk size='1.4rem' className='pr-1'/>CATTLETALK</Navbar.Brand>
        </LinkContainer>
          
        <Form >
          <Row>
            <Col >
          <FormControl type="text" placeholder="Search" className="mr-sm-2" inline />
            </Col>
            <Col lg='2'>
          <Button variant="outline-success" className='' >Search</Button>
            </Col>
          </Row>
        </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
      <NavDropdown  id="nav-dropdown" title={ 
          <IoMdNotificationsOutline size='1.6rem' className='bg-primary mx-2'/>
        }>
        
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
      </NavDropdown>
        
        <LinkContainer to='/profile'>
          <Nav.Link><CgProfile size='1.2rem' className='pr-1'/>Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/animals'>
          <Nav.Link >
            <FaShoppingCart size='1.2rem' className='pr-1 '/>Ecommerce
            </Nav.Link>
        </LinkContainer>
      </Nav>
        
      </Navbar.Collapse>
      </Container>
    </Navbar>
            </header>
        )
    }
 
}
  
  export default Header
