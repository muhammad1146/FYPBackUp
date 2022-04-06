import React,{useState} from 'react'
import {Form,Col,Row,FormControl,Button} from 'react-bootstrap'
const DiscussionSearchForm = (props) => {
    return (
        <div>
    <Form >
      <Row>
            <Col >
                <FormControl type="text" placeholder="Search" className="mr-sm-2" inline onChange={props.handleSearchChange}/>
            </Col>
            <Col lg='2'>
                <Button variant="outline-success" className='' type='submit' >Search</Button>
            </Col>
      </Row>
    </Form> 
        </div>
    )
}

export default DiscussionSearchForm
