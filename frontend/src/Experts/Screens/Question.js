import React, {  useEffect, useState } from 'react'
import '../../App.css'
import {Row, Container, Button,Card,Image,Form} from 'react-bootstrap'
import axios from 'axios';
import Answers from '../Components/Answers'
const Question = () => {
    // const [user,setUser] = useContext(UserContext);
    const [question,setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [questionComments, setQuestionComments] = useState([]);
    const [questionImages,setQuestionImages] = useState([]);
    const [questionReacts, setQuestionReacts] = useState([]);
    const [commentForm,setCommentForm] = useState(false);
   
    useEffect(()=> {
        const data = axios.get();
        setQuestion(data);
        setAnswers(data);
        setQuestionComments(data);
        setQuestionImages(data);
        setQuestionReacts(data);
    },[]); 
    const QuestionComments =({questionComments} ) => {
    return(
    <>
        {questionComments.map(comment => {
            <Card>
                <Card.Body>Question Comment</Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Commentor Id</Card.Subtitle>
            </Card>
        })}
    </>)
    }
    const CommentForm =( ) => {
        const [body, setBody] = useState('');
        const [questionId, setQuestionId] = useState('');
        const [commentorType, setCommentorType] = useState('');
        const handleCommentSubmit = () =>{

        }
        
        return(
        <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>)
        }
    return (
        <div className='contentSection'>
            <h1> Question Screen</h1>
        <Container fluid>
        <h3>Question Title</h3>
        <span>asked:</span>
            <Row className='questionBody'>
            Question Body
            </Row>
            <Row>
                {questionImages.map(image =>{
                        return (<Image />)
                    })
                }
            </Row>
        <h2>Question Comments</h2>
            <QuestionComments questionComments />
            <Button onClick={setCommentForm(true)}> Comment </Button>
            {
                commentForm ? (<CommentForm />) : (null)
            }
            <CommentForm />
            <Answers answers />
        </Container>
        </div>
    )
}
export default Question
