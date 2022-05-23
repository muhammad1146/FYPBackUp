import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '../../../App.css'
import { AiFillHome } from "react-icons/ai";
import { FaUsers,FaQuestionCircle,FaTags } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import {Nav, Form} from 'react-bootstrap'
const EcommerceSidebar = ({setCity,setCattleType}) => {
    const handleCityChange = (e) =>{
      // console.log(e);
      setCity(e.target.value);
      setCityRadio(e.target.value);
    };
    const [cityRadio,setCityRadio] = useState("All");
    const handleTypeChange = (e) =>{
      setCattleType(e.target.value);
    }
    const [TypeRadio,setTypeRadio] = useState("All");
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
            {console.log(cityRadio)}
                        <Form.Check

                            label="All"
                            name="radio-city"
                            value={"All"}
                            type='radio'
                            checked ={cityRadio==="All"?true:false}
                            onChange={handleCityChange}
                            id='inline-radio-1'
                          />
                          <Form.Check
                            onChange={handleCityChange}
                            label="Attock"
                            value='Attock'
                            checked ={cityRadio==="Attock"?(true):false}
                            name="radio-city"
                            type='radio'
                            id='inline-radio-2'
                          />
                          <Form.Check
                            
                            onChange={handleCityChange}
                            value='Rawalpindi'
                            checked={cityRadio==="Rawalpindi"?(true):false}
                            label="Rawalpindi"
                            name="radio-city"
                            type='radio'
                            id='inline-radio-3'
                          />
              </Form>


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
