import React from 'react'
import '../../App.css'
import {Row,Col, Container} from 'react-bootstrap'
import Question from '../QuestionComponent'
const QuestionScreen = () => {
    return (
        <div className='contentSection'>
            <h1> Questions Screen</h1>
        <Container fluid>

            <Row>
                <Col lg='9'> 
            <Question />
                </Col>

            </Row>
        </Container>
        </div>
    )
}

export default QuestionScreen
