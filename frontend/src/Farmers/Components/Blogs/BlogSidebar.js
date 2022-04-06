import React from 'react'

import {Link} from 'react-router-dom'
import '../../../App.css'
import { AiFillHome } from "react-icons/ai";
import { FaUsers,FaQuestionCircle,FaTags } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import {Nav,Card,Accordion} from 'react-bootstrap'

const BlogSidebar = () => {
 
    return (
      <>
        <Nav className='sidebarRight'>
            <Nav.Item className='sidebarItem' >
              <Nav.Link>
              <Link to="/home" >
              <AiFillHome className='py-0 m-0 text-right' size='1.1rem'/> Home
                
              </Link>
              </Nav.Link>
            </Nav.Item>
            
            <Nav.Item className='sidebarItem' >
              <Nav.Link>
                <Link to="/profile">
                <CgProfile size='1.1rem'/>  Profile
                </Link>
                </Nav.Link>
            </Nav.Item>

            <Nav.Item className='sidebarItem' >
              <Nav.Link>
                <Link to="/users" >
                <FaUsers size='1.1rem'/>    Users
                </Link>
              </Nav.Link>
            </Nav.Item>
          
            <Accordion defaultActiveKey="0">
              <Card>
                      <Accordion.Item as={Nav.Item} variant="link" eventKey="0">
                <Card.Header>
                        <Link to='/questions'>
                        <FaQuestionCircle size='1.1rem'/> Questions
                      </Link>
                </Card.Header>
                    </Accordion.Item>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Nav.Item className='' >
                      <Nav.Link>
                        <Link to="/tags">
                          <FaTags size='1.1rem'/>Tags
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                      <Nav.Item className='' > 
                      <Nav.Link> 
                          <Link to="/unanswered" className='p-0'>
                            <RiQuestionAnswerFill size='1.1rem'/>Unanswered
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

        
          <Nav.Item className='sidebarItem' >
          <Nav.Link>
            <Link to="/blogs">
           <RiQuestionAnswerFill size='1.1rem'/>Blogs
            </Link>
            </Nav.Link>
          </Nav.Item>
        
        </Nav>
  
        </>
    )
}

export default BlogSidebar;
