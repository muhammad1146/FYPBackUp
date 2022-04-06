import React, { useState } from 'react'
import {Form,Col,Row,FormControl,Button,Navbar,Container,Nav,Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom';
const EcommerceNavbar = ({postFormToggle,setPostFormToggle}) => {
    const [searchText,setSearchText] = useState('');
    return (
    <Navbar bg="light" expand="lg">
    
        <Container fluid>  
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex" >
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>{setSearchText(e.target.value)}}
                />
                <Button variant="outline-success" type='submit'>Search</Button>
            </Form>
            <Nav
                className="ml-auto my-2 my-lg-0 bg-warning"
                style={{ maxHeight: '100px' }}
                navbarScroll>
                {/* <Nav.Link as={Link} to="ecommerce/add-post" disabled={url==="/add-post"?(true):(false)} >add Post</Nav.Link> */}
                <Button onClick={()=>setPostFormToggle(!postFormToggle)} >
                Add Post
                </Button>
            </Nav>
            {/* {console.log(url)} */}
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default EcommerceNavbar
