import React from 'react'
import '../App.css'
import { Row,Container,Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <>
        <Container fluid>


        {/* <Row> 
            <Col lg="3" className="bg-dark text-center ps-relative" >  
           <div className=''>
            <h4>1st</h4>

           </div>
            </Col>
            <Col lg="3" className="bg-dark ps-relative" >  
            <div className=''>
            <h4>2nd</h4>

           </div>
            
            </Col>
            <Col lg="3" className="bg-dark ps-relative" >  
            <div className=''>
            <h4>3rd</h4>

           </div>
            
            </Col>
            <Col lg="3" className="bg-dark ps-relative" >  
            <div className=''>
            <h4>4th</h4>

           </div>
            
            </Col>
            
        </Row> */}
            <Row>
        <Col className= "text-center py-3">Copyright &copy; CATTLETALK</Col>
            </Row>
       
        </Container>

        </>
    )
}

export default Footer
