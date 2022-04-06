import React, { useEffect, useState } from 'react';
import {Form, Button,Card,Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CommentsArea = (props) => {
  let [commentPage,setCommentPage] = useState(1);
  let [forceUpdate,setForceUpdate] = useState(false);
  let [comments, setComments] = useState([]);
  console.log(useParams());
  let {pid} = useParams();
  useEffect(async ()=>{
    let result = await axios.get(`/api/ecommerce/${pid}/comments/?page=${commentPage}`);
    if(result.data.comments.count>0){
      setComments(result.data.comments.rows);
    }
    console.log(result);
  },[])

  useEffect(async ()=>{
    let result = await axios.get(`/api/ecommerce/${pid}/comments/?page=${commentPage}`);
    if(result.data.comments.count>0){
      setComments(result.data.comments.rows);
    }
    console.log(result);
  },[forceUpdate])

  
  

  const CommentForm = ({pid,setForceUpdate})=>{
    const [comment,setComment] = useState('');
    const [submission,setSubmission] = useState(false);
    useEffect(()=>{
      setComment('');
    },[])
    console.log(pid)
    const handleSubmit = async (e) =>{
    
      let result;
      try {
         result = await axios({
          method:'post',
          headers: { 'Content-Type': 'application/json' },
          url:`/api/ecommerce/${pid}/comments`,
          data:{
            commentBody:comment
          }
        });
        
      } catch (error) {
        console.log(error.response.data);        
              return;
      }
      setForceUpdate((prev)=>!prev);
      setComment('');
      setSubmission(prev=>!prev);
      console.log(result);
     
    }
    return(
      <>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Comment Here</Form.Label>
        <Form.Control as="textarea" rows={2} onChange={(e)=>{
          setComment(e.target.value) 
        }} value={comment} />
      </Form.Group>
      <Button variant="success" onClick={handleSubmit}>
      Submit
      </Button>
      </>
   
       
        )  
  }
  
  const CommentBox = ({comment}) =>{
    return (
      <>
    <Card className='EcommentCard'>
  <Card.Header>{comment.Farmer.userName}</Card.Header>
  <Card.Body>
    <Card.Text>
     {comment.commentBody}
    </Card.Text>
  </Card.Body>
</Card>
      </>
    )
  }
  return (
  <>
  <CommentForm pid={pid} setForceUpdate={setForceUpdate}/>

  {comments.length>0 ? (comments.map((comment)=>(
    <Row>
      <CommentBox key={comment.uuid} comment={comment} />
    </Row>
  )

  )):(
    <Row>
      No Comments for this Post.
    </Row>
  )}

  </>);
};
