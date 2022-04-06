import React,{useEffect} from 'react';
import {Row,Col, Container,Badge} from 'react-bootstrap'
import axios from 'axios';

const BlogComments = ({comments}) => 
{
useEffect(

)
const Comments = ({comment}) => 
{
    return(
        <Card style={{ width: 'auto' }}>
            <Card.Body>
                <Card.Title>{comment.author}</Card.Title>
                <Card.Text>
                {comment.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );

}

const CommentForm = ()=>{
    return(
      <Form className='my-2'>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Comments Here</Form.Label>
        <Form.Control as="textarea" rows={2} />
      </Form.Group>
      <Button variant="success" type="submit">
      Submit
      </Button>
    </Form>
       
        )  
  }

return (
<>
<CommentForm />
    <Container>
        {
            comments.map(comment => (
            <Comments comment  />
        ))
        }
    </Container>
</>
)

}


export default BlogComments;