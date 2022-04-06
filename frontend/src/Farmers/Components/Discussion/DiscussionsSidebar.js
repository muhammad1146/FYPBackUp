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
            <Nav.Item className='sidebarItem my-2' >
              <Nav.Link as={Link} to='questions/top'><AiFillHome className='py-0 m-0 text-right' size='1.1rem'/> Top Questions
              </Nav.Link>
            </Nav.Item>
          
            <Nav.Item className='sidebarItem my-2' >
              <Nav.Link as={Link} to='experts'>
                <CgProfile size='1.1rem'/>  Experts
                </Nav.Link>
            </Nav.Item>

             <Nav.Item className='sidebarItem my-2' >
              <Nav.Link as={Link} to='farmers'><FaUsers size='1.1rem'/>    Farmers
              </Nav.Link>
            </Nav.Item> 
                     <Nav.Item className='my-2' > 
                      <Nav.Link as={Link} to='/unanswered'> 
                            <RiQuestionAnswerFill size='1.1rem'/>Unanswered
                      </Nav.Link>
                    </Nav.Item>
                    
                     <Nav.Item className='my-2' > 
                      <Nav.Link as={Link} to='/questions/my'> 
                            <RiQuestionAnswerFill size='1.1rem'/>My Questions
                      </Nav.Link>
                    </Nav.Item> 

                     <Nav.Item className='my-2' >
                      <Nav.Link as={Link} to='/tags'>
                          <FaTags size='1.1rem'/>Tags
                      </Nav.Link>
                    </Nav.Item>
        </Nav>
        </>
    )
}
export default DiscussionsSidebar;
