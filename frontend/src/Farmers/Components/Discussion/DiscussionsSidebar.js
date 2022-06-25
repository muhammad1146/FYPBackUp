import React from 'react'
import {Link } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { FaUsers,FaTags } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiQuestionAnswerFill } from "react-icons/ri";
import {Nav} from 'react-bootstrap';
const DiscussionsSidebar = () => {
    return (
      <>
        <Nav className='sidebarRight py-4 m-1 w-100 border'> 
                     <Nav.Item className='my-2 mx-0' > 
                      <Nav.Link as={Link} to='/discussion/my'> 
                            <RiQuestionAnswerFill size='1.1rem'/>My Questions
                      </Nav.Link>
                    </Nav.Item> 

                     <Nav.Item className='my-2 mx-0' >
                      <Nav.Link as={Link} to='/discussion/tags'>
                          <FaTags size='1.1rem'/>Tags
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className='sidebarItem my-2 mx-0' >
                      <Nav.Link as={Link} to='/discussion/experts'>
                        <CgProfile size='1.1rem'/>  Experts
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className='sidebarItem my-2 mx-0' >
                      <Nav.Link as={Link} to='/discussion/farmers'><FaUsers size='1.1rem'/>    Farmers
                      </Nav.Link>
                    </Nav.Item>
        </Nav>
        </>
    )
}
export default DiscussionsSidebar;
