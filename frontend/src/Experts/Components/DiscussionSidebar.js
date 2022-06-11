import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { FaUsers,FaQuestionCircle,FaTags } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import {Nav,Card,Accordion} from 'react-bootstrap';

const DiscussionsSidebar = () => {
    console.log('from expert sidebar')
    return (
      <>
        <Nav className='sidebarRight' defaultActiveKey='1' style={{padding:"0",paddingLeft:'8px'}}>
        <Nav.Item className='sidebarItem' style={{margin:"5px 0"}} >
            <Nav.Link>
              <Link to="/discussion" >
              <AiFillHome className='py-0 m-0 text-right' size='1.1rem'/> Questions
                
              </Link>
              </Nav.Link>
        </Nav.Item>

          {/* <Nav.Item className='sidebarItem' style={{margin:"5px 0"}} >
              <Nav.Link eventKey='2'>
                <Link to="/ecommerce/my">
                  My Posts
                </Link>
                </Nav.Link>
          </Nav.Item> */}
          <Nav.Item className='sidebarItem' style={{margin:"5px 0"}} >
            <Nav.Link>
                <Link to="/discussion/experts">
                <CgProfile size='1.1rem'/>  Experts
                </Link>
            </Nav.Link>
          </Nav.Item>
           
          <Nav.Item className='sidebarItem' style={{margin:"5px 0"}} >
          <Nav.Link>
            <Link to="/farmers">
           <RiQuestionAnswerFill size='1.1rem'/>Farmers
            </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{margin:"5px 0"}}>
              <Nav.Link>
                <Link to="/discussion/tags">
                    <FaTags size='1.1rem'/>Tags
                </Link>
              </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item style={{margin:"5px 0"}}>
              <Nav.Link>
                <Link to="/discussion/my">
                    <FaTags size='1.1rem'/>My Questions
                </Link>
              </Nav.Link>
          </Nav.Item> */}
          <Nav.Item style={{margin:"5px 0"}}>
              <Nav.Link>
                <Link to="/discussion/unanswered">
                    <FaTags size='1.1rem'/>Unanswered
                </Link>
              </Nav.Link>
          </Nav.Item>
        </Nav>
  
        </>
    )
}

export default DiscussionsSidebar;
