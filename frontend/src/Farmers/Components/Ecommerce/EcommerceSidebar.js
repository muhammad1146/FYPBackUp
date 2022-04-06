import React from 'react'
import {Link} from 'react-router-dom'
import '../../../App.css'
import { AiFillHome } from "react-icons/ai";
import { FaUsers,FaQuestionCircle,FaTags } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import {Nav,Card,Accordion, Form} from 'react-bootstrap'
const EcommerceSidebar = ({setCity,setCattleType}) => {
    const handleCityChange = (e) =>{
      setCity(e.target.value);
    }
    const handleTypeChange = (e) =>{
      setCattleType(e.target.value);
    }
    return (
      <>
        <Nav className='sidebarRight' defaultActiveKey='1' style={{padding:"0",paddingLeft:'8px'}}>
            <Nav.Item className='sidebarItem' style={{margin:"0"}} >
              <Nav.Link eventKey='1'>
              <Link to="/ecommerce" >
              <AiFillHome className='py-0 m-0 text-right' size='1.1rem'/> Home
              </Link>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className='sidebarItem' style={{margin:"0"}} >
              <Nav.Link eventKey='2'>
                <Link to="/ecommerce/my">
               
                  My Posts
                </Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className='sidebarItem' style={{margin:"0"}} >
              <Nav.Link>
                <Link to="/ecommerce/posts/unsold" >
                <FaUsers size='1.1rem'/>    Unsold
                </Link>
              </Nav.Link>
            </Nav.Item>
            <p style={{borderBottom:"1px solid gray",width:"100%",marginBottom:"5px"}}>
            City 
            </p>
            <Form>
                        <Form.Check

                            label="All"
                            name="radio-city"
                            value={"All"}
                            defaultChecked={true}
                            type='radio'
                            onChange={handleCityChange}
                            id='inline-radio-1'
                          />
                          <Form.Check
                            onChange={handleCityChange}
                            label="Attock"
                            value='Attock'
                            name="radio-city"
                            type='radio'
                            id='inline-radio-2'
                          />
                          <Form.Check
                            inline
                            onChange={handleCityChange}
                            value='Rawalpindi'
                            label="Rawalpidni"
                            name="radio-city"
                            type='radio'
                            id='inline-radio-3'
                          />
              </Form>

            {/* <Accordion defaultActiveKey="0">
              <Card>
                      <Accordion.Item as={Nav.Item} variant="link" eventKey="0">
                <Card.Header className='p-0 px-2'>
                        City
                </Card.Header>
                    </Accordion.Item>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className='p-0 px-2'>
                          <Form>
                        <Form.Check

                            label="All"
                            name="radio-city"
                            value={"All"}
                            defaultChecked={true}
                            type='radio'
                            onChange={handleCityChange}
                            id='inline-radio-1'
                          />
                          <Form.Check
                            onChange={handleCityChange}
                            label="Attock"
                            value='Attock'
                            name="radio-city"
                            type='radio'
                            id='inline-radio-2'
                          />
                          <Form.Check
                            inline
                            onChange={handleCityChange}
                            value='Rawalpindi'
                            label="Rawalpidni"
                            name="radio-city"
                            type='radio'
                            id='inline-radio-3'
                          />
                          </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion> */}

            <p style={{borderBottom:"1px solid gray",width:"100%",marginBottom:"5px"}}>CattleType</p>
            <Form>
                        <Form.Check

                            label="All"
                            name="radio-city"
                            value={"All"}
                            defaultChecked={true}
                            type='radio'
                            onChange={handleTypeChange}
                            id='inline-radio-1'
                          />
                          <Form.Check
                            onChange={handleTypeChange}
                            label="Cow"
                            value='Cow'
                            name="radio-city"
                            type='radio'
                            id='inline-radio-2'
                          />
                          <Form.Check
                            inline
                            onChange={handleTypeChange}
                            value='Goat'
                            label="Goat"
                            name="radio-city"
                            type='radio'
                            id='inline-radio-3'
                          />
                          </Form>
            {/* <Accordion defaultActiveKey="0">
              <Card>
                      <Accordion.Item as={Nav.Item} variant="link" eventKey="0">
                <Card.Header className='p-0 px-2'>
                        cattleType
                </Card.Header>
                    </Accordion.Item>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className='p-0 px-2'>
                          <Form>
                        <Form.Check

                            label="All"
                            name="radio-city"
                            value={"All"}
                            defaultChecked={true}
                            type='radio'
                            onChange={handleTypeChange}
                            id='inline-radio-1'
                          />
                          <Form.Check
                            onChange={handleTypeChange}
                            label="Cow"
                            value='Cow'
                            name="radio-city"
                            type='radio'
                            id='inline-radio-2'
                          />
                          <Form.Check
                            inline
                            onChange={handleTypeChange}
                            value='Goat'
                            label="Goat"
                            name="radio-city"
                            type='radio'
                            id='inline-radio-3'
                          />
                          </Form>

                      {/* <Nav.Item className='' >
                      <Nav.Link eventKey='0'>
                        <Link to="/ecommerce/posts/?city">
                          All Cities
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='' >
                      <Nav.Link eventKey='1'>
                        <Link to="/ecommerce/posts/?city">
                          Attock
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                      <Nav.Item className='' >
                      <Nav.Link>
                          <Link to="/ecommerce/posts/?city=Rawalpindi" className='p-0'>
                            Rawalpindi
                          </Link>
                        </Nav.Link>
                      </Nav.Item> */}
                

          <Nav.Item className='sidebarItem' style={{margin:"0"}} >
          <Nav.Link>
            <Link to="/farmers">
           <RiQuestionAnswerFill size='1.1rem'/>Farmers
            </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        </>
    )
}

export default EcommerceSidebar;
