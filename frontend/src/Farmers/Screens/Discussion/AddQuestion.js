import React,{useState,useCallback, useRef} from 'react';
import {Formik} from 'formik'
import axios from 'axios';
import { ImCross } from "react-icons/im";
import * as yup from 'yup';
import {Editor} from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Form,Row,Col,Button, Badge,Modal} from "react-bootstrap";
import {EditorState} from 'draft-js';
import {convertToHTML} from 'draft-convert';
import { useHistory } from 'react-router';
import {debounce} from 'lodash.debounce'
import DraftDefaultConfig from "./Editor/config";
let validationSchema = yup.object().shape({
  title:yup.string().required(),
  body:yup.string().required(),
  weight:yup.number().required(),
  cattleImages:yup.array(),
  tags:yup.array().min(3)
});
const AddQuestion = () => {
  let history = useHistory();
  const titleRef = useRef(null);
  const tagFieldRef = useRef(null);
  const [show,setShow] = useState(true);
  console.log('rendered from Add Question');
  let [error, setError] = useState('');
  let [title,setTitle] = useState('');
  const [editorState,setEditorState] =useState(EditorState.createEmpty()); 
  const [tagSuggestionData,setTagSuggestionData] = useState([]);
  const [questionTags,setQuestionTags] = useState([]);

  const delayedCallback = async(e)=>{
    if(e.target.value===''){
      setTagSuggestionData([]);
      return;
    }
    let result = await axios.get(`/api/questions/tags/search?query=${e.target.value}`);
    setTagSuggestionData(result.data);
  }; 
  
const addTag = (data) => {
  for(let i=0;i<questionTags.length;i++){
    console.log(questionTags[i].id,data.id)
    if(questionTags[i].id===data.id){
      tagFieldRef.current.value='';
      setTagSuggestionData([])
      return false;
    }
  };
  setQuestionTags((prev)=>{
    if(prev.length<1){
      return [data]
    }else{
      return [...prev,data]
    }
  });
  console.log('question tags after: ',...questionTags)

  tagFieldRef.current.value='';
  setTagSuggestionData([])
};
const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    console.log('title',title)
    console.log('body',convertToHTML(editorState.getCurrentContent()));
    let result =  await axios.post("/api/questions/",{title,body:convertToHTML(editorState.getCurrentContent()),
    tags:questionTags.map(i=>i.id)}
       );
       if(result.status===200) {
         alert('Question added successfully.');
         history.push('/discussion');
       }

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}
const removeTag = (id) =>{
    let removedTags = questionTags.filter(i=>i.id!==id);
    setQuestionTags(removedTags);
}
  return (
    <>
    <Modal show={show} onHide={()=>{setShow(false);history.push('/discussion')}}>
    <Modal.Header >
          <Modal.Title>Add Question</Modal.Title>
    </Modal.Header>
    <Modal.Body>
<Form id={"question-form"}  onSubmit={handleSubmit} style={{margin:"10px 40px"}}>
<h5>{error}</h5>
  <Row className="mb-3">
    <Form.Group as={Col} className="p-0" controlId="formGridName">  
      <Form.Control type="text" placeholder="Question title"  
        name="title" onChange={(e)=>setTitle(e.target.value)}/>
    </Form.Group>
  </Row>
  <Row>
  <Form.Group>
    <Form.Label style={{marginBottom:'0'}}>Question body</Form.Label>
  </Form.Group>
  <div style={{margin:"10px",border:"1px solid gray",}} className="mb-3 mt-1">
  
  <Editor
  {...DraftDefaultConfig}
  toolbarOnHidden
  editorState={editorState}
  onEditorStateChange = {(currentState)=>setEditorState(currentState)}
  editorStyle={{minHeight:"300px"}}
  /> 
 {/* {console.log(convertToHTML(editorState.getCurrentContent()))} */}
 {/* {console.log('questionTags',...questionTags)} */}
  </div>
  </Row>
  <Row>
  {
    questionTags.map(i=>
    (

      <Badge style={{padding:"10px",borderRadius:"3px",cursor:'auto'}}>
      <ImCross size={'0.4rem'} style={{position:'relative',top:'-11px',left:'-8px',cursor:'pointer'}} onClick={()=>removeTag(i.id)}/>
      {i.tag}</Badge>
    
      ))
  }
  </Row>
  <Row className="mb-3">
 
    <Form.Group as={Col} className="p-0"  controlId="formGridWeight">
      <Form.Control ref={tagFieldRef} placeholder="Question tags" name="tags" onChange={delayedCallback} type="text"/>
  <div style={{backgroundColor:'gainsboro',height:'130px',overflow:'auto'}}>
    <ul style={{listStyle:"none",padding:'0',margin:'3px 5px'}}>
    {tagSuggestionData.map(data=>{return(<li onClick={()=>addTag(data)}style={{cursor:"pointer",borderBottom:'1px solid lightgray'}} >{data.tag}</li>)}
      )}
    </ul>
  </div>
    </Form.Group>
  </Row>
  
</Form>
    </Modal.Body>
    <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShow(false);history.push('/discussion')}}>
            Close
          </Button>
          <Button variant="primary"  type="submit" form="question-form">
            Submit
          </Button>
        </Modal.Footer>
    </Modal>

    </>
  )
}
export default AddQuestion
