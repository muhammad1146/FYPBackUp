import React, { useEffect, useState } from 'react'
import '../../../App.css'
import {Row,Col,Card, Badge} from 'react-bootstrap';
import {Eidtor,EditorState, Editor} from 'draft-js';
import axios from 'axios'
import { BsTriangleFill  } from "react-icons/bs";
import { CgEditUnmask } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { convertFromHTML } from 'draft-convert';
const Questions = () => {
    console.log('from Questions component')
    const [questions,setQuestions] = useState([]);
    const [totalQuestions,setTotal] = useState(0);
    const [string,setString] = useState('');
    const [isReacted,setIsReacted] = useState(false);
useEffect ( async () => {
    let result = await axios.get('/api/questions');
    console.log(result)
     setQuestions(result.data.content);
     setTotal(result.data.totalPages);
},[])
const QuestionCard = ({question}) => {
    const [editorState,setEditorState]= useState(EditorState.createEmpty());
    const [questionReacts,setQuestionReacts] = useState()
    useEffect(async()=>{
        try {
            let result = await axios.get(`/api/questions/${question.uuid}/reacts`);
            if(result.status===200){
                setQuestionReacts(result.data);
            }
        } catch (error) {
            
        }
       setEditorState(EditorState.push(editorState,convertFromHTML(question.body)));
    },[]);
    const downVote = (questionId) =>{
        try {
            let result = axios.post(`/api/questions/${questionId}`,{commitType:'DOWN'});
            if(result.status===200){
                
            }
        } catch (error) {
            
        }
    }
    return (
    <>
        <Card className='w-100'>
            <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                <Editor editorState={editorState}/>
                </Card.Text>
                {question?.QuestionTags?.map(i=>(<Tag tag={i.QuestionTagBox}/>))}
            </Card.Body>
            <Card.Footer style={{padding:'0'}}>
            <Row>
            <Col lg={9}>
               <Row>
                   <Col>

                <BsTriangleFill id="upvote" style={{cursor:"pointer"}} size={'1rem'}/>
                   </Col>
               </Row>
               <Row>
                   <Col>
               <small style={{textAlign:'center'}}>1</small>

                   </Col>
               </Row>
               <Row>
                   <Col>

                <BsTriangleFill id="downvote" style={{cursor:"pointer",transform:'rotate(180deg)'}} onClick={()=>downVote(question.uuid)} size={'1rem'}/>
                   </Col>
               </Row>
            </Col>
            <Col lg={2} style={{padding:'0',textAlign:'end'}}>
            <h6 
            style={{padding: "0",margin: "0",position: "relative",top: '15px'}}>{question?.Farmer?.userName}</h6>
            <small style={{position:"relative",top:"10px"}}>{question.Farmer?.FarmersRank?.rankname}</small>
            </Col>
            <Col lg={1}>
            <Link to={`/discussion/farmers/${question.Farmer?.uuid}`}>
                <img src={question.Farmer?.profileImage?.length>3?`http://localhost:5000/${question.Farmer?.profileImage}`:'/blankProfile.jpg'} width="40px" style={{borderRadius:"20px",margin:"5px",height:"40px"}} />
            </Link>
            </Col>
            </Row>
            </Card.Footer>
        </Card>
    </>
    )
}
const Tag = ({tag}) =>{
    return (
    <Badge className='p-2 mx-1' >{tag.tag}</Badge>
    )
        
    
}
    return (
        <div className='px-2'>
            <h4> Questions</h4>
            <Row className='m-0'>
                <Col lg={12}> 
                {questions.map((question) =>( <QuestionCard question={question} />   ))}
                </Col> 
            </Row> 
        </div>
    )
}

export default Questions
