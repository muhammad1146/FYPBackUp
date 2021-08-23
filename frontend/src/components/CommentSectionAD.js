import React,{useState} from 'react'
import { Container,Card,Form,Button} from 'react-bootstrap'
import Comments from '../data/CattleComments'

const CommentSectionAD = () => {
    
    const [comments,setComments] = useState("");
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
    const Comment = ({comment})=>{
        return(
        <Card style={{ width: 'auto' }}>
        <Card.Body>
            <Card.Title>{comment.author}</Card.Title>
            <Card.Text>
            {comment.text}
            </Card.Text>
        
        </Card.Body>
        </Card>)
    }
    
    return (
        <>
           
            <h3>Comment Box</h3>
            <CommentForm />
           <Container className='mx-0'>
               {
                   Comments.map(comment => (
                       <Comment comment={comment} />
                       ) )  
                    }
                    </Container> 
            {/* <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} /> */}
       
        </>
    )
}

export default CommentSectionAD
