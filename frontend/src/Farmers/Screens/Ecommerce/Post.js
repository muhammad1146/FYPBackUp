import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import {Row,Col,Card,ListGroup,ListGroupItem,Button,Image,Modal,Form,Alert} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineUser,AiFillPhone } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { useHistory } from 'react-router';
import { CommentsArea } from '../../Components/Ecommerce/Comments';
import {Toaster, toast } from 'react-hot-toast';
const Post = (props) => {
    const history = useHistory();
    let [post,setPost] = useState({});
    let [mainImage, setMainImage] = useState(null);
    const [orderModal,setOrderModal] = useState(false);
    let [order,setOrder] = useState(false);
    let [orderData,setOrderData] = useState(null);
    const [message,setMessage] = useState('');
    let uuid = props.match.params.pid; 
    const [alertBox, setAlert] = useState({
        message:null,
        heading:null,
        variant:null,vis:false
    });
     console.log(alertBox)
    useEffect( async () => {
        const tId = toast.loading('Fetching Post!');
        const result = await axios.get(`/api/ecommerce/${uuid}`);
        if(result.data.animalPost!=null){
            toast.dismiss(tId);
            setPost(result.data.animalPost); 
            setMainImage(result.data.animalPost.PostImages[0].image);   
        }else{
            
            setPost({error:"Some error Occurred!"});
        }  
    },[])
    useEffect(()=>{
    setOrder(()=>
    {
        return post?.AnimalPostOrders?.some(r=> r.Farmer.uuid===props.user.uuid)
    });
    
        setOrderData(()=> post?.AnimalPostOrders?.find(r=>r.Farmer.uuid===props.user.uuid));

    
    },[post])
    function AlertMessage({alertBox,setAlert}) {
        const [show, setShow] = useState(alertBox.vis);
        
        setTimeout(()=>{
             if(show) 
             {
                 setShow(false);  
                setAlert({})
             }
        },5000)
        if (show) {
            
          return (
            <Alert variant={alertBox.variant} onClose={() => setShow(false)} style={{position:"fixed",zIndex:"10",right:"10px",top:"30px", padding:"10px"}}> 
              <Alert.Heading>{alertBox.Heading}</Alert.Heading>
              <p style={{marginBottom:"5px"}}>
                {alertBox.message}
              </p>
            </Alert>
          );
        }else{
           return null
        }
      }
      
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
                     console.log(result);
                     setOrderData(result.data.order)
                     setAlert({message:"The Request for this post been sent to Owner.",heading:"Request Sent",variant:"info",vis:true})
                     setOrderModal(false);
                     setMessage('');
                 }
            } catch (error) {
                alert(error.message);
            }
        }
    }
    const deleteOrder = async() => {
        let result = await axios.delete(`/api/ecommerce/${uuid}/orders/${orderData.id}`);
        if(result.status===200){
            setOrder(false);
            setOrderData(null);
            setAlert({message:"Deleted Order successfully",variant:"warning",heading:"Delete Message",vis:true});
            alert("Deleting order went successful!!")
        }else{
            alert("Failed to undo order!!")
        }
    }
    const OrderButtonClicked = (e)=>{

        e.preventDefault();
        if(order===true){
            deleteOrder();
        }else{
            setOrderModal(true);
        }
    }
    const deletePost = async (uuid) => {
       if(!window.confirm("Are you sure want to delete this post?")){
        return;
       }
        try {
            let result = await axios.delete(`/api/ecommerce/${uuid}`);
            if(result.status===200){
                toast.success('Post deleted successfully.');
                history.goBack();
            }else{
                toast.error('Request failed with status code', result.status);

            }
        } catch (error) {
            toast.error('Request failed with status code', error.message);   
        }
    }
    return (
        <>
        <AlertMessage alertBox={alertBox} setAlert={setAlert}/>
    <Row>
   
        <Col lg={1}>
            <Link className='btn btn-dark my-3' to='/ecommerce/all'> Back </Link>
        </Col>
        <Col lg={10}></Col>
        <Col lg={1} className='py-2'>
        <BsTrash onClick={()=>deletePost(post.uuid)} style={{cursor:'pointer',display:`${props.user.uuid===post.Farmer?.uuid?'block':'none'}`}} size='2rem' />
        </Col>
    </Row>
        <Row className='border' >
           <Col lg={5} className='text-center my-auto' >
                <Image src ={`http://localhost:5000/${mainImage}`}  
                alt={Post.cattle_type} fluid
                className='' rounded width="98%"
                />
                <Row className='my-2'>
                    {post?.PostImages?.map((I) =>(
                        <Col lg='3'>
                            <Card className=''>
                            <Card.Img src={`http://localhost:5000/${I.image}`} alt={I.image} onClick={()=>setMainImage(I.image)} style={{cursor:"pointer"}}/>
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
                    {props.user?.uuid===post.Farmer?.uuid?(
                        <ListGroupItem>
                            <Button className='btn btn-block' type="button" onClick={()=>history.push(`/ecommerce/${uuid}/orders`)}>
                        Orders Placed
                            </Button>
                        </ListGroupItem>
                    ):
                    (
                    <ListGroupItem>
                        <Button className='btn btn-block' type='button' disabled={post?.availability==='A'?false:true} onClick={OrderButtonClicked} style={{backgroundColor:order===true?"gray":"black"}}>
                        {order===false?"Request Owner":'Cancel'}
                        </Button>
                    </ListGroupItem>
                    )
                    }
                    {order===true?(<p style={{color:"red"}}>This post is ordered, click to revert!</p>):null}
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
            <Form.Control as="textarea" rows={2} onChange={(e)=>(setMessage(e.target.value))} maxLength={255} />
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
        <Toaster position='bottom-right' />
        </>
    )
}
export default Post
