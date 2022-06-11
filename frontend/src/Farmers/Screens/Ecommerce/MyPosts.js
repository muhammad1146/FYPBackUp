import React,{useState,useEffect} from 'react'
import {Card,CardGroup,ListGroup,ListGroupItem,Row,Col} from "react-bootstrap";
import {Link } from 'react-router-dom';
import axios from 'axios'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';

const MyPosts = () => {
  const [posts,setPosts] = useState([]);
  const [isThereData,setIsThereData] = useState(true);
  useEffect( async () => {
        try {
            let result = await axios.get('/api/ecommerce?ptype=my');
            if(result.data.content.length>0){
                setPosts(result.data.content);
                
            }else {
                setIsThereData(false);
            }            
        } catch (error) {
            alert(error.message);
        }


return () => {

}
}, []);
console.log(posts)
const PostsCard = ({post}) => {
   
    return(
    <Card style={{ width: '18rem' }} >
        <Link to={`/ecommerce/${post.uuid}`}>
        <Card.Img variant="top" src={`http://localhost:5000/${post.PostImages[0].image}`} alt='farmers picture' className='ml-auto' height={"180px"}/>
        </Link>
        <Card.Body>
            <Card.Title>{post.price}</Card.Title>
            <Card.Text>
            {post.description}
            </Card.Text>
            <Card.Text >
                <span>
                    {post.PostReacts.length>0?(<AiFillHeart size="1.5rem" />):(<AiOutlineHeart size='1.5rem'/>) }
                    
                    {post.PostReacts.length===0?(null):(post.PostReacts.length)}
                </span>
                    
            </Card.Text>
            <Card.Text >{post.city} </Card.Text>
        </Card.Body>
    </Card>

    )
}
  return (
    <>
    <Row>

        {isThereData? (null):(<h5>No Posts Found!</h5>)}
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
