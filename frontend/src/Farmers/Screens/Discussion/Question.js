import React, { useContext, useState,useEffect, useRef } from 'react'
import '../../../App.css'
import {Row,Card,Form,Image,Button,Col, Badge} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import Answers from '../../Components/Discussion/Answers';
import BodyEditor from '../../Components/Discussion/BodyEditor';
import { Link } from 'react-router-dom';
import Reacts from '../../Components/Discussion/Reacts';
const Question = ({user}) => {
    let history = useHistory();
    const {qid} = useParams('qid');
    const [question,setQuestion] = useState({});
    const [answers, setAnswers] = useState({});
    const [commentCheck,setCommentCheck] = useState(false);
    const [questionComments, setQuestionComments] = useState([]);
    const [commentForm,setCommentForm] = useState(false);
    const [date,setDate] = useState(null);
    const [refreshAnswer,setRefreshAnswer] = useState(false);
    const [commentRefresh,setCommentRefresh] = useState(false);
    const refreshPage = () => {
        setRefreshAnswer(p=>!p);
    }
    useEffect(async()=> {
        let questiondata = await axios.get(`/api/questions/${qid}`);
        let  commentsResp = await axios.get(`/api/questions/${qid}/comments`);
        let answers = await axios.get(`/api/questions/${qid}/answers`);
        setAnswers(answers.data.content);
        setQuestion(questiondata.data);
        console.log('answers result: ',answers.data);
        setQuestionComments(commentsResp.data?.content);
    },[]); 
    useEffect(async()=>{
        console.log('inside commentCheck')
        let result = await axios.get(`/api/questions/${qid}/comments`);
        if(result.status===200) {
            console.log(result.data);
            setQuestionComments(result.data.content)
        }
    },[commentRefresh])
    useEffect( async()=>{
        let result = await axios.get(`/api/questions/${qid}/answers`);
        if(result.status===200) {
            console.log(result.data);
            setAnswers(result.data.content)
        }
    },[refreshAnswer]);

    
    console.log('question',question);
    console.log('answers',answers);
    console.log('questionComments',questionComments);
const QuestionComments =({comments} ) => {
        console.log('from QuestionComments: ',comments);
    return(
    <>
        {questionComments?.map(comment => {
            let date = new Date(comment.createdAt);
            let isFarmer = comment.Farmer;
            return (
                <Card style={{border:'none',borderTop:isFarmer?'1px solid gainsboro':'1px solid blue',borderBottom:isFarmer?'1px solid gainsboro':'1px solid blue'}} className="mb-3">
                <Card.Body className='py-2 px-1'>{comment.body} - <Link style={{color:'lightblue'}} to={`/discussion/${isFarmer!==null?(`farmers/${isFarmer.uuid}`):(`experts/${comment.Expert.uuid}`)}/`}>
                {comment.Farmer!==null?(
                    comment.Farmer.userName
                ):(
                    comment.Expert.userName
                )}
                </Link>
                <span className="ml-1">
                    {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                </span>
                </Card.Body>
            </Card>
            )
            
        })}
    </>)
    }
    const CommentForm =( ) => {
        const commentField = useRef(null);
        const [body, setBody] = useState('');
        const handleCommentSubmit = async (e) =>{
            e.preventDefault();
            commentField.current.value='';
            let result = await axios.post(`/api/questions/${question.uuid}/comments`,{
                body
            });
            if(result.status===200){
                alert('comment added successfully');
                console.log(result.data);
                setCommentRefresh(p=>!p);
            }
        }
        return(
        <Form onSubmit={handleCommentSubmit}>
        <Row>
            <Col lg={'11'} className={'p-0'}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control ref={commentField} type="text" onChange={(e)=>setBody(e.target.value)} />
            </Form.Group>
            </Col>
            <Col lg={'1'} className={'p-0'} style={{position:'relative',top:'28px'}}>
            <Button variant="primary" type="submit">

              Submit
            </Button>
            </Col>
        </Row>
          </Form>)
        }
    const PrintDate = ({dateFormat}) =>{
        const date = new Date(dateFormat);
        return (
        <span style={{display:'block',textAlign:'right',marginTop:'10px'}}>asked:{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
        )
    }
    const deleteQuestion = async (uuid) => {
        if(!window.confirm('Are you want to delete this Question?')) return;
        try {
            let result = await axios.delete(`/api/questions/${uuid}`);
            console.log('result', result);
            if(result.status===200){
                alert('Question has been deleted successfully.');
                history.push('/discussion/my')
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
    
    return (
            <div className='contentSection mx-4 my-3' >
<div style={{display:question.Farmer?.uuid===user.uuid?'block':'none'}}>

            <Button onClick={()=>deleteQuestion(question.uuid)} style={{display:'block',marginLeft:'auto'}} variant='danger'>Delete</Button>
</div>
            {question.uuid?(
                <>
            <h3>{question.title}</h3>
            <Row className='questionBody'>
            
            <Col>
                <Card>
                    <Card.Body className={'py-0'}>
                <Row> 
                    <Col lg={'1'}> 
                    <Reacts user={user} reacts={question.QuestionReacts}/> 
                    </Col>
                    <Col>
                        <BodyEditor answer={question.body} />
                    </Col>
                </Row>
                    </Card.Body>
                </Card>
                </Col>
                </Row>
                <Row>
                    <Col>
                    {
                    question.QuestionTags.map(t=>(
                       <Link to={`/discussion/tags/${t.tagId}`}>
                       <Badge>{t.QuestionTagBox.tag}</Badge>
                       </Link> 
                       ))
                    }
                    </Col>
                    <Col>
                    <PrintDate  dateFormat={question.createdAt}/>
                    </Col>
                </Row>
                <QuestionComments comments={questionComments} />
                <CommentForm />
                <Answers user={user} answers={answers} refreshPage={refreshPage} />
            </>
            ):(
                <h6>Loading</h6>
            )}
            </div>
    )
}

export default Question
