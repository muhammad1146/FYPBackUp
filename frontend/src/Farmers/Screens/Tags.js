// This Screen is without the right side bar 
import React from 'react'
import Tag from '../Tag'
import {Row,Col,Button,Jumbotron} from 'react-bootstrap'
const TagsScreen = (props) => {
    
    return (
        <div className='contentSection'>
          <Jumbotron className='p-4'>
            <h1>Tags</h1>
              <p>
              A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question. </p>
              <p>
                <Button variant="warning">Learn more</Button>
              </p>
            </Jumbotron>
          <Row>
          <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
             <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
             <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
             <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
             <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
             <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
             <Col lg='4' md='3' sm='4'>
             <Tag />
             
             </Col>
            
          </Row>
          

           
        </div>
    )
}

export default TagsScreen
