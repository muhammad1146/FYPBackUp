import React, { useEffect, useState } from 'react'
import '../../../App.css'
import {Row,Col,Card, Badge} from 'react-bootstrap';
import {EditorState, Editor} from 'draft-js';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { convertFromHTML } from 'draft-convert';
const MyQuestions = ({search}) => {
    console.log('from MyQuestions component')
    const [questions,setQuestions] = useState([]);
    const [totalQuestions,setTotal] = useState(0);
    const [string,setString] = useState('');
useEffect ( async () => {   
        let result = await axios.get(`/api/questions/my?search=${search===''?null:search}`);
        setQuestions(result.data);
        setTotal(result.data.length);
},[])
const QuestionCard = ({question}) => {
    const [editorState,setEditorState]= useState(EditorState.createEmpty());
    useEffect(async()=>{
       setEditorState(EditorState.push(editorState,convertFromHTML(question.body.substring(0,100))));
    },[]);
    return (
    <>
        <Card className='w-100 m-3' style={{borderRadius:"10px"}}>
            <Card.Body>
                <Link to={`/discussion/${question.uuid}`}>    
                <Card.Title>{question.title}</Card.Title>
                </Link>
                <Card.Text>
                <Editor readOnly={true} editorState={editorState}/>
                </Card.Text>
                {question?.QuestionTags?.map(i=>(<Tag tag={i.QuestionTagBox}/>))}
            </Card.Body>
            <Card.Footer style={{padding:'0'}}>
            <Row>
            <Col lg={9}>
               <Row>
                   <Col lg={2} style={{textAlign:"center",marginTop:'10px'}}>
               <small style={{textAlign:'center'}}>Votes:{question.QuestionReacts.length}</small>

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
            <h4> MyQuestions</h4>
            <Row className='m-0'>
                <Col lg={12}> 
                {questions?.map((question) =>( <QuestionCard question={question} />   ))}
                </Col> 
            </Row> 
        </div>
    )
}

export default MyQuestions
