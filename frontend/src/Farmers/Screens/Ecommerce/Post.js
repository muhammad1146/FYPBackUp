import React,{useEffect,useState} from 'react'
import { Link,useParams } from 'react-router-dom';
import {Row,Col,Card,ListGroup,ListGroupItem,Button,Image,Figure,Modal,Form} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineUser,AiFillPhone } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import axios from 'axios';
import { CommentsArea } from '../../Components/Ecommerce/Comments';
const Post = (props) => {
    let [post,setPost] = useState({});
    let [mainImage, setMainImage] = useState(null);
    const [orderModal,setOrderModal] = useState(false);
    let [order,setOrder] = useState(false);
    const [message,setMessage] = useState('');
    let uuid = props.match.params.pid; 
    useEffect( async () => {
        const result = await axios.get(`/api/ecommerce/${uuid}`);
        console.log(result)
        if(result.data.animalPost!=null){
            setPost(result.data.animalPost); 
            setMainImage(result.data.animalPost.PostImages[0].image);   
        }else{
            setPost({error:"Some error Occurred!"});
        }  
    },[])
    const submitOrder  = async (e) =>{
        e.preventDefault();
        if(order===false){
            try {
                let result =await axios({
                    method: 'post',
                    url: `/api/ecommerce/${uuid}/orders`,
                    data: {
                      message:message
                    }
                  });
                 if(result.status===200){
                     setOrder(true);
                     setOrderModal(false);
                     setMessage('');
                 }
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    const OrderButtonClicked = (e)=>{
        e.preventDefault();
        if(order===true){

        }else{
            setOrderModal(true);
        }
    }
    return (
        <>
    <Row>
   
        <Col lg={1}>
            <Link className='btn btn-dark my-3' to='/ecommerce/all'> Back </Link>
        </Col>
        <Col lg={10}>
        <Figure>
            <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src=""
            />
            <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
            </Figure.Caption>
        </Figure>
        </Col>
        <Col lg={1} className='py-2'>
        <BiDotsVerticalRounded size='2rem' />
        </Col>
    </Row>
        <Row className='border' >
           <Col lg={5} className='text-center my-auto' >
                <Image src ={`http://localhost:5000/${mainImage}`}  
                alt={Post.cattle_type} fluid
                className='' rounded
                />
                <Row className='my-2'>
                    {post?.PostImages?.map((I) =>(
                        <Col lg='3'>
                            <Card className=''>
                            <Link>
                            <Card.Img src={`http://localhost:5000/${I.image}`} alt={I.image} onClick={()=>setMainImage(I)}/>
                            </Link>
                            </Card>
                        </Col>

                    ))}  
                </Row>  
            </Col>
            <Col  lg={3}   >
                <ListGroup >
                    <ListGroupItem>
                           <span>Rs:{post?.price}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                        Type:{post?.cattleType}
                    </ListGroupItem>
                    <ListGroupItem>
                        Breed: {Post.breed}
                    </ListGroupItem>
                    <ListGroupItem>
                        Weight:{post?.weight}KG
                    </ListGroupItem>
                    <ListGroupItem>
                        Description:{post?.description}
                    </ListGroupItem>
                    <ListGroupItem>
                        Status:{post?.availability==='A' ? 'Available' : 'Sold' }
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button className='btn btn-block' type='button' disabled={post?.availability==='A'?false:true} onClick={OrderButtonClicked} style={{backgroundColor:order?'dark':'gray'}}>
                        {order===false?"Request Owner":'Cancel'}
                        </Button>
                    </ListGroupItem>
                    {order===true?(<p>This post is ordered, click to revert!</p>):null}
                </ListGroup>
            </Col>
        <Modal show={orderModal} onHide={()=>setOrderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message for the Owner goes here.</Form.Label>
            <Form.Control as="textarea" rows={2} onChange={(e)=>(setMessage(e.target.value))}/>
        </Form.Group>
        </Form>
        </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setOrderModal(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={(e)=>submitOrder(e)}>
                Order
            </Button>
            </Modal.Footer>
        </Modal>
            <Col lg={4}>
            <ListGroupItem>
                <Card className='p-2'>
                    <Card.Title>{post?.Farmer?.description}</Card.Title>
                    <Card.Text className='m-1'>  
                    <AiOutlineUser size='1.7rem' className='m-0 p-0'/>
                       {post?.Farmer?.userName}</Card.Text>
                    <Card.Text> member since {post?.Farmer?.createdAt}</Card.Text>
                    <Card.Text>{post?.Farmer?.phoneNumber} <AiFillPhone size='1.3rem'/></Card.Text>
                    <LinkContainer to={`/farmers/${post?.Farmer?.uuid}`}>
                    <Button variant='primary'>Visit User</Button>
                    </LinkContainer>
                </Card>
            </ListGroupItem>
            </Col>
        </Row>
        
        <CommentsArea user={props.user} />       
        </>
    )
}
export default Post
