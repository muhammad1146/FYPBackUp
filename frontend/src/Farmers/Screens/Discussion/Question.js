import React, { useContext, useState,useEffect, useRef } from 'react'
import '../../../App.css'
import {Row,Card,Form,Image,Button,Col, Badge} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import Answers from '../../Components/Discussion/Answers';
import BodyEditor from '../../Components/Discussion/BodyEditor';
import { Link } from 'react-router-dom';
import Reacts from '../../Components/Discussion/Reacts';
import { BsTrash } from "react-icons/bs";
import {Toaster, toast} from 'react-hot-toast';
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
        try {    
        const tId =   toast.loading('Fetching Question');
        let questiondata = await axios.get(`/api/questions/${qid}`);
        let  commentsResp = await axios.get(`/api/questions/${qid}/comments`);
        let answers = await axios.get(`/api/questions/${qid}/answers`);
        if(questiondata.status===200 && commentsResp.status===200 & answers.status===200){
            toast.dismiss(tId);
            setAnswers(answers.data.content);
            setQuestion(questiondata.data);
            setQuestionComments(commentsResp.data?.content);
        }else{
            toast.error('Request Failed');
        }
    } catch (error) {
        toast.error(error.message);
    }
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
    const deleteComment = async (id) => {
        try {
            if(!(window.confirm('Are you sure want to delete this Comment?'))){
                return;
            }
         let result = await axios.delete(`/api/questions/${qid}/comments/${id}`);
         if(result.status===200){
            toast.success('Comment deleted successfully.');
            setCommentRefresh(c=>!c);
         }else{
            toast.error('Request failed with status code :', result.status);
         }
        } catch (error) {
            toast.error('Request failed with status code :', error.message);
        }
    }
    return(
    <>
        {questionComments?.map(comment => {
            let date = new Date(comment.createdAt);
            let isFarmer = comment.Farmer;
            return (
                <Card className="mb-3" style={{borderLeft:'unset', borderRight:'unset'}}>
                <Card.Body className='py-2 px-1' >{comment.body} - <Link style={{color:'lightblue'}} to={`/discussion/${isFarmer!==null?(`farmers/${isFarmer.uuid}`):(`experts/${comment.Expert.uuid}`)}/`}>
                {comment.Farmer!==null?(
                    comment.Farmer.userName
                ):(
                    comment.Expert.userName
                )}
                </Link>
                <span className="ml-1">
                    {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                </span>
                <span style={{cursor:'pointer',float:'right',display:comment.Expert?`${comment.Expert.uuid===user.uuid?'block':'none'}`:`${comment.Farmer.uuid===user.uuid?'block':'none'}`}}>
                    <BsTrash size={'1rem'} onClick={()=>deleteComment(comment.uuid)} />
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
                toast.success('comment added successfully');
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
                toast.success('Question has been deleted successfully.');
                history.push('/discussion/my')
            }else{
                toast.error('Request failed with status code:' , result.status)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
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
