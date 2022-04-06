import React,{useEffect,useState} from 'react'
import {Card,Row,Col,CardGroup} from "react-bootstrap";
import axios from 'axios';
import Sidebar from '../../Components/Ecommerce/EcommerceSidebar';

import {Link} from 'react-router-dom'
import LoadingAnimation from '../../../components/LoadingAnimation'
const Posts = ({city,cattleType,setCattleType,setCity}) => {
    const [posts,setPosts] = useState([]);
    
    useEffect( async () => {
            
            let result = await axios.get(`/api/ecommerce?city=${city}&type=${cattleType}`,{  
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(result.data.totalPages!=0){
                console.log(result.data.content[0]);
                setPosts(result.data.content);
            }else{
                console.log("no posts found!")
                setPosts([0]);
            }
            
        
        return () => {
        
        }
    }, []);

    const PostsCard = ({post}) => {
        return(
            <Card style={{ width: '18rem' }} className='m-1 p-1'> 
           <Link to={`/ecommerce/${post.uuid}`}>
            <Card.Img variant="top" 
             src={`http://localhost:5000/${post.PostImages[0].image}`} alt='farmers picture' 
             className='border' />
           </Link>
            <Card.Body>
                <Card.Title>Rs {post.price}</Card.Title>
                <Card.Text>
               {post.description}
                </Card.Text>
                <Card.Text >Type:{post.cattleType}  </Card.Text>
                <Card.Text >{post.city} </Card.Text>
                <Card.Text >{post.weight} Kgs </Card.Text>
            </Card.Body>
            <Card.Footer>
        <small className="text-muted">Last updated {post.updatedAt}</small>
    </Card.Footer>
        </Card>
            
            )
        }
        return (
            <>
        <Row>
            <Col lg={2} xl={2}> <Sidebar setCity={setCity} setCattleType={setCattleType}  /> </Col>
        <Col>
        <Row>
       {posts[0]===0 && (<h3>No Posts Found!</h3>)}
       {/* {posts.length===0 && (<LoadingAnimation />)} */}

       <CardGroup>
        {posts.length!=0 && posts[0]!=0 && posts.map(post => (
            <Col key={post.uuid}>

            <PostsCard key={post.uuid} post={post}/>
            </Col>
        )
        
        )}
        </CardGroup>
        {!posts && (<div>Loading...from </div>)}
        </Row>
        </Col>

        </Row>
        </>
    )
}

export default Posts
