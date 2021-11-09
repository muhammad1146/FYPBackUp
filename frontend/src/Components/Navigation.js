import React,{useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container} from 'react-bootstrap';
const Navigation = () => {
const [isLoggedIn, setIsLoggedIn] = useState(true);
const [UserType, setUserType] = useState('farmer');
if (isLoggedIn && UserType==='farmer'){
  return (
   
    <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
            <Nav className="ml-auto">
                <LinkContainer to='/questions'> 
                    <Nav.Link >
                        Discussion
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/blogs'>
                    <Nav.Link  >
                        Blogs
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/ecommerce'>
                    <Nav.Link  >
                        Ecommerce
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Container>
    </Navbar>
      
    )
    }
    else if(isLoggedIn && UserType === 'expert'){
     return (
        
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <Nav className="ml-auto">
                <LinkContainer to='/discussion'>
                    <Nav.Link>
                        Discussion
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/blogs'>
                    <Nav.Link >
                        Blogs
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        
        </Container>
    </Navbar>
        
        )
    }
    else if(isLoggedIn && UserType==='admin')
    {
        return (
   
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Nav className="ml-auto">
                    <LinkContainer to='/questions'> 
                        <Nav.Link >
                            Discussion
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/blogs'>
                        <Nav.Link  >
                            Blogs
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/ecommerce'>
                        <Nav.Link  >
                                Ecommerce
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
          </Container>
        </Navbar>
              
            )
    }
 
}
  
  export default Navigation
