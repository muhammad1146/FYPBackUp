import {EditorState} from 'draft-js';
import {convertToHTML} from 'draft-convert';
import {Editor} from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React,{useState} from 'react';
import BodyEditor from './BodyEditor';
import { Card,Row,Col,Button, Form,  } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DraftDefaultConfig from '../../../Farmers/Screens/Discussion/Editor/config'
import axios from 'axios';
import { FiTrash2 } from "react-icons/fi";
import { useParams } from 'react-router';
const Answers = ({answers,refreshPage,user}) => {
    console.log('answers from Answers component: ', answers);
    const {qid} = useParams('qid');
    const [answerSectionToggle,setAnswerSectionToggle] = useState(false);
    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const answerSubmit = async(e) => {
        e.preventDefault();
        const body = convertToHTML(editorState.getCurrentContent())
        let result = await axios.post(`/api/questions/${qid}/answers`,{body});
        console.log(result);
        if(result.status===200){
            alert("Answer added successfully.");
            setAnswerSectionToggle(false);
            refreshPage();
        }
    }
    const deleteAnswer = async (i) => {
        if(!window.confirm('Are you sure want to delete this answer?')){
            return;
        }
        try {
            let result = await axios.delete(`/api/questions/${qid}/answers/${i}`);
            if(result.status===200) {
                refreshPage();
            }else{
                alert('Error Deleting an answer');
            }
        } catch (error) {
            alert(error.message);
            console.log(error)
        }
    }
    return (
        <>
        <Row>
            <Col><h3>Answers</h3></Col>
            {(user.type==='E') && (<Col>
                <Button className="mb-2" onClick={()=>setAnswerSectionToggle(i=>!i)} style={{display:'block',marginLeft:'auto'}} variant={answerSectionToggle?'danger':'warning'} >Answer</Button>
            </Col>)}
        </Row>
        <Row style={{display:answerSectionToggle?'block':'none'}}>
        <Form onSubmit={answerSubmit}>
            <Editor
              {...DraftDefaultConfig}
                toolbarOnHidden
            editorState={editorState}
            onEditorStateChange = {(currentState)=>setEditorState(currentState)}
            editorStyle={{minHeight:"300px",border:'1px solid gray',padding:'10px 20px'}} />
            <Button style={{display:'block',marginLeft:'auto',marginTop:'10px'}} className="mb-2" variant="success" type="submit">Submit</Button>
        </Form>
        </Row>
        
        {answers?.map(answer => {
            let date = new Date(answer.createdAt);
            return (
        <Card className="mb-2">
            <Card.Body>
          { (answer.Expert.uuid===user.uuid) && (<Card.Text style={{textAlign:'end',margin:'0'}}><FiTrash2 size="1.5rem" style={{cursor:'pointer'}} onClick={()=> deleteAnswer(answer.uuid)} /></Card.Text>)}
            <BodyEditor answer={answer.body} />
            </Card.Body>
            <Card.Footer>
               <Card.Text style={{textAlign:'end',padding:'5px'}}> <Link to={`/discussion/experts/${answer.Expert.uuid}`} style={{color:'blue'}}> {answer.Expert.userName}  </Link> <span style={{marginLeft:'20px'}}>Posted: {`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</span></Card.Text>
            </Card.Footer>
        </Card>
            );
        })}

    </>
    )
}

export default Answers
