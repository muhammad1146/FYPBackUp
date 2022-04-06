import React,{useState,useEffect} from 'react'
import {Card,CardGroup,ListGroup,ListGroupItem,Row,Col} from "react-bootstrap";
import {Link } from 'react-router-dom';
import axios from 'axios'

const MyPosts = () => {
  const [posts,setPosts] = useState([]);
// console.log("myPosts Component rendered!!")
  useEffect( async () => {

    let result = await axios.get('/api/ecommerce?ptype=my',
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(result.data.content)
    if(result.data){
        setPosts(result.data.content);
    }else {
        setPosts([0]);
    }

return () => {

}
}, []);
const PostsCard = ({post}) => {
    {
        //Card Representation
        //Cattle First Image
        //Price
        //Address
        //Reacts
    }
    return(
    <Card style={{ width: '18rem' }} >
        <Link to={`/ecommerce/${post.uuid}`}>
        <Card.Img variant="top" src={`http://localhost:5000/${post.PostImages[0].image}`} alt='farmers picture' className='ml-auto'/>
        </Link>
        <Card.Body>
            <Card.Title>{post.price}</Card.Title>
            <Card.Text>
            {post.description}
            </Card.Text>
            <Card.Text >{post.PostReacts.length}</Card.Text>
            <Card.Text >{post.city} </Card.Text>
        </Card.Body>
    </Card>

    )
}
  return (
    <>
    <Row>

        {posts.length===0 && (<h3>Loading...</h3>)}
        {posts[0]===0 && (<h3>No Posts Found! </h3>)}
        <CardGroup>

        {posts && posts.map(post => (
            <Col key={post.uuid}>
            <PostsCard post={post} />
            </Col>
        )

        )}
        </CardGroup>
    </Row>
        </>
  )
}

export default MyPosts
