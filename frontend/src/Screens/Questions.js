import React, { useEffect, useState } from 'react'
import '../../App.css'
import {Row,Col, Container, Card} from 'react-bootstrap'
import Question from '../QuestionComponent'
import axios from 'axios'
const Questions = () => {
    const [questions,setQuestions] = useState([]);
    const [string,setString] = useState('');
    let url = window.location.pathname;
    
useEffect (() => {
    let data;
    if(url==='/discussion/questions')
    {
    data = axios.get('')
    }
    else if(url==='/discussion/questions/my'){
    data = axios.get('');
    }
    else if(url==='/discussion/questions/unanswered'){
        data = axios.get('');
    }
    setQuestions(data);
},[])
const QuestionCard = (props) => {
    return (
        //Question Title
        //Question text
        //Farmer userName
        //question Tags
        //question Reacts
<>
<Card>
<Card.Body>
    <Card.Title>Question title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
</>
    )
}
    return (
        <div className='contentSection'>
            <h1> Questions</h1>
        <Container fluid>
            <Row>
                <Col lg='9'> 
                {   questions.map((question) =>
                {
                    return(
                    <QuestionCard  question/>
                    );})
                }
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Questions
