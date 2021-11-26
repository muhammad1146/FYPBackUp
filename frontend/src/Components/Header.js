import React,{useContext} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container,Form,Button,FormControl,Row,Col, NavDropdown  } from 'react-bootstrap';
import { FaSignInAlt,FaShoppingCart  } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useHistory } from 'react-router';
import { GiTalk } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import {UserContext} from '../Contexts/UserContext'
const Header = () => {
const {user,setUser} = useContext(UserContext);


const LoggedInHeader = () =>{
        let history = useHistory()
        const Logout = (e) => {
            setUser(prev => ({
                ...prev,
                uuid:undefined,
                type:undefined,
                token:undefined
            }));
               history.push('/login');
            
        }
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
                    <LinkContainer to='/profile'>
                        <Nav.Link>
                            <CgProfile size='1.2rem' className='pr-1'/>
                            Profile
                        </Nav.Link>
                    </LinkContainer>
                    {/* <LinkContainer to='/animals'>
                        <Nav.Link >
                            <FaShoppingCart size='1.2rem' className='pr-1 '/>
                            
                        </Nav.Link>
                    </LinkContainer> */}
                    
                        
                        <Nav.Item onClick={Logout}>
                        <Button className='mx-2'>
                        <FaSignInAlt size='1.2rem' className='pr-1'/>
                            Logout
                            </Button>
                        </Nav.Item>
                        
                </Nav>
            
            </Navbar.Collapse>
        </Container>
    </Navbar>
 </header>
        )
    }

    const LoggedOutHeader = () => {
        return(
            <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand> <GiTalk size='1.4rem' className='pr-1'/>CATTLETALK</Navbar.Brand>
            </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to='/register'>
                        <Nav.Link>
                            <CgProfile size='1.2rem' className='pr-1'/>
                            Register
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'> 
                        <Nav.Link >
                        <FaSignInAlt size='1.2rem' className='pr-1'/>
                            Login
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            
            </Navbar.Collapse>
        </Container>
    </Navbar>
    
 </header>
        )
    }
    
     return (
         <>
        {user.token ? ( <LoggedInHeader /> ) : (<LoggedOutHeader /> )}
    </>
    )
}

export default Header
