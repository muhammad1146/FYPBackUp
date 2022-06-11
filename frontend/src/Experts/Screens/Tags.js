import React, { useEffect, useState,useCallback } from 'react'
import {Card,Row,Col,Button,Modal,Form, FormGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Tags = ({user,search}) => {
  console.log('rendered from tag module')
  const [tags,setTags] = useState([]);
  const [addTagToggle,setAddTagToggle] = useState(false);
  const [tag,setTag] = useState('');
  const [description,setDescription] = useState('');
  const [previousTagData,setPreviousTagData] = useState([]);
  const [isTagNameValid,setIsTagNameValid] = useState(false);
  const [refresh,setRefresh] = useState(false);
  
  useEffect( async()=>{
    if(search===''){
      let result = await axios.get('/api/questions/tags');
      console.log(result);
      setTags(result.data.content);
    }else{
      let result = await axios.get(`/api/questions/tags/search?query=${search}`);
      console.log(result);
      setTags(result.data)
    }
  },[]);
  useEffect( async()=>{
    let result = await axios.get('/api/questions/tags');
    console.log(result);
    setTags(result.data.content);
  },[refresh]);
  const delayedCallback = async(e)=>{
    if(e.target.value==='') {
      setPreviousTagData([]);
      return
    }
    setTag(e.target.value);
    let result = await axios.get(`/api/questions/tags/search?query=${e.target.value}`);
    setPreviousTagData(result.data);
   if(result.data.length>0) {
     setIsTagNameValid(false)
    }else {
      setIsTagNameValid(true);
    }
  }; 
  
// const previousTags =useCallback(()=>debounce(delayedCallback,600),[]);
  
  const addNewTag = async(e) =>{
    e.preventDefault();
    console.log(isTagNameValid);
    if(!isTagNameValid){
      alert("tag name must be unique.")
      return
    }
    try {
      
      let result = await axios.post('/api/questions/tags',{
        tag,description
      });
      if(result.status===200 ){
        alert('tag added successfully.');
        setRefresh(i=>!i);
        setAddTagToggle(false);
      }else{
        alert("Error creating new Tag!");
      }

    } catch (error) {
      alert(error.message);
    }

  }
  
  return (
    <>
    <Row>
      <Col lg={5}></Col>
      <Col lg={4}></Col>
      <Col >{(user.type==='E')&&(<Button style={{display:'block',marginLeft:'auto',marginTop:'10px'}} onClick={()=>setAddTagToggle(true)}>New Tag</Button>)}</Col>
    </Row>
    <Modal
            show={addTagToggle}
            onHide={()=>setAddTagToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>New Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='addExeprienceForm' onSubmit={addNewTag}>
               <FormGroup>
               <Form.Control type="text" minLength={'3'} maxLength={'15'} placeholder="Enter New Tag" required  className='m-2 rounded' onChange={delayedCallback} />
                <small class='form-control' style={{backgroundColor:"white",height:'auto',padding:'0',position:'relative',top:'-7px',left:'8px',display:previousTagData.length>0?'block':'none'}}>
                <div style={{borderRadius:'5px',backgroundColor:'#d9d9d9',padding:'5px 8px'}}>{previousTagData.map(i=>(<div>{i.tag}</div>))}</div>
                </small>
               </FormGroup> 

                <Form.Control type="text" placeholder="Enter Tag Description" className="m-2 rounded" onChange={(e)=>setDescription(e.target.value)}>
                 
                </Form.Control>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setAddTagToggle(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' form='addExeprienceForm'>Submit
              </Button>
            </Modal.Footer>
          </Modal>
    <Row>
        {tags.map(i=>(
          <Col lg={3}>
          <Card
          bg='light'
          key={i.id}
          text={'dark'}
          // style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Body>
          <Link to={`/discussion/tags/${i.id}`}> <Card.Title> {i.tag} </Card.Title></Link>
            <Card.Text>
        {i.description}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        ))}
    </Row>
    </>
  )
}

export default Tags