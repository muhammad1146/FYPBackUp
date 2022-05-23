import React,{useEffect,useState} from 'react'
import {Card,Row,Col,CardGroup} from "react-bootstrap";
import axios from 'axios';
import Sidebar from '../../Components/Ecommerce/EcommerceSidebar';

import {Link} from 'react-router-dom'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
const Posts = ({user}) => {
    const [cattleType,setCattleType] = useState('All');
    const [city,setCity] = useState('All');
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
                setPosts([0]);
            }
            
        
        return () => {
        
        }
    }, [city,cattleType]);

    const PostsCard = ({post}) => {
        const [postlike,setPostLike] = useState(()=>{
           return post.PostReacts.some(r=>{
               if(r.Farmer.uuid===user.uuid)return true;
               
            })
        });
        const [myReact,setReact] = useState(()=>{
            if(postlike)
            {
                return post.PostReacts.find(r=>  r.Farmer.uuid===user.uuid)
            }else{
                return null;
            }
        });
        const [reactCounts, setReactCounts] = useState(post.PostReacts.length);
        let date = new Date(post.updatedAt);
        const processReact = async () =>{
        if(!postlike){
        try {
            let result = await axios.post(`/api/ecommerce/${post.uuid}/reacts`,{
                commitType:"L"
            });
            if(result.status===200){
                console.log(result.data.react);
                setReact(result.data.react);
                setReactCounts(r=>r+1);
                setPostLike(true);

            }
        } catch (error) {
            alert(error.message);
        }
        }
        else
        {
            console.log(myReact)
            let result = await axios.delete(`/api/ecommerce/${post.uuid}/reacts/${myReact.id}`);
            if(result.data===1){
                setReactCounts(r=>r-1);
                setPostLike(false);
            }
        }
        }
        return(
            <Card style={{ width: '18rem' }} className='m-1 p-1'> 
           <Link to={`/ecommerce/${post.uuid}`}>
            <Card.Img variant="top" 
             src={`http://localhost:5000/${post.PostImages[0].image}`} alt='farmers picture' 
             className='border' height={"180px"}/>
           </Link>
            <Card.Body>
                <Card.Title>Rs {post.price}</Card.Title>
                <Card.Text >Type:{post.cattleType}  </Card.Text>
                <Card.Text >{post.city} </Card.Text>
                <Card.Text >{post.weight} Kgs </Card.Text>
            </Card.Body>
            <Card.Footer>
        <Row>
            <Col>
            {
     
                <>
                    <span>
                    {postlike?(<AiFillHeart size="1.5rem" />):(<AiOutlineHeart size='1.5rem'/>) }
                    
                    {reactCounts===0?(null):(reactCounts)}
                    </span>
                </> 
            }
            
            </Col>
            <Col style={{padding:"0"}}>
        <small className="text-muted" style={{display:"block",fontSize:"11px",textAlign:"end"}}>Last updated {`${date.getDate()}/${(date).getMonth()+1}/${(date).getFullYear()}`}</small>

            </Col>
        </Row>
    </Card.Footer>
        </Card>
            
            )
        }
        return (
            <>
        <Row>
            <Col lg={2} xl={2}> 
                <Sidebar setCity={setCity} setCattleType={setCattleType}  />
            </Col>
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
