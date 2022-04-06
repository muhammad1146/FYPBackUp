import React,{useContext, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container,Form,Button,FormControl,Row,Col, NavDropdown  } from 'react-bootstrap';
import { FaSignInAlt,FaShoppingCart  } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useHistory } from 'react-router';
import { GiTalk } from "react-icons/gi";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { SiBloglovin } from "react-icons/si";
import { GiSellCard } from "react-icons/gi";
// import { NavLink } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
// import {UserContext} from '../Contexts/UserContext'
const Header = ({user}) => {
//     console.log("from header!");
//     let token = jwt.verify(Cookies.get("accessToken"),"secret");
// const [user,setUser] = useState(token);

const LoggedInHeader = () =>{
        let url = user.type==='F'? `/farmers/${user.uuid}`:user.type==='E'?`/experts/${user.uuid}`:`/admin/${user.uuid}`;
        let history = useHistory()
        const Logout = (e) => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            
            history.push('/login');    
        }
        console.log(user)
        return (
            <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand> <GiTalk size='1.4rem' className='pr-1'/>CATTLETALK</Navbar.Brand>
            </LinkContainer>
           
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="w-100">
                    {/* <LinkContainer to={url}>
                        <Nav.Link>
                            <CgProfile size='1.2rem' className='pr-1'/>
                            Profile
                        </Nav.Link>
                    </LinkContainer> */}
                    <LinkContainer to='/discussion'>
                        <Nav.Link>
                            <RiQuestionAnswerFill size='1.2rem' className='pr-1'/>
                            Discussion
                        </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/blogs'>
                        <Nav.Link>
                            <SiBloglovin size='1.2rem' className='pr-1'/>
                            Blogs
                        </Nav.Link>
                    </LinkContainer>
                    {
                        user.type==='F'?(
                            <LinkContainer to='/ecommerce/all'>
                        <Nav.Link>
                            <GiSellCard size='1.2rem' className='pr-1'/>
                            Ecommerce
                        </Nav.Link>
                    </LinkContainer>
                        ):null
                    }
                        <Nav.Item onClick={Logout} className="ml-auto">
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
        {user.uuid ? ( <LoggedInHeader /> ) : (<LoggedOutHeader /> )}
        
         {/* {console.log(user.uuid,"rendered from header!")} */}
    </>
    )
}

export default Header
