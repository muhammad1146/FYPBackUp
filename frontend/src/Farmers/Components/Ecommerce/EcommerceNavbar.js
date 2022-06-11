import React, { useState } from 'react'
import {Form,Col,Row,FormControl,Button,Navbar,Container,Nav,Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom';
const EcommerceNavbar = ({postFormToggle,setPostFormToggle,setText}) => {
    let timer = null;
      const customFunction = (value) =>{
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            setText(value)
        },900)
      }
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
                onChange={(e)=>{customFunction(e.target.value)}}
                />
            </Form>
            <Nav
                className="ml-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll>
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
