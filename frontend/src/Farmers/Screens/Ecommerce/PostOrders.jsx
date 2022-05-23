import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Row,Card,ListGroup,Col } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const PostOrders = (props) => {
  const [postOrders,setPostOrders] =useState([]);
  const [postOrderStatus,setPostOrderStatus] = useState(null);
  let uuid = props.match.params.pid
  useEffect( async () =>{
    try {
      let result = await axios.get(`/api/ecommerce/${uuid}/orders`);
      console.log(result.data);
      setPostOrders(result.data.orders);
    } catch (error) {
      alert(error.message);
    }
  },[]);
  useEffect( async () =>{
    try {
      let result = await axios.get(`/api/ecommerce/${uuid}/orders`);
      console.log(result.data);
      setPostOrders(result.data.orders);
    } catch (error) {
      alert(error.message);
    }
  },[postOrderStatus]);
 const handleOrderSubmission = async (id,currentStatus) =>{
   if(currentStatus==='Pending'){
     try {
       const result = await axios.put(`/api/ecommerce/${uuid}/orders/${id}`,{
         status:"Accepted"
       });
       setPostOrderStatus(result.data[1]);
       alert("Post Order has been accepted. \n Note: Only One order can move to Accepted Stage.")
       
     } catch (error) {
       alert(error.message);
     }
}else{
  try {
    const result = await axios.put(`/api/ecommerce/${uuid}/orders/${id}`,{
      status:"Pending"
    });
    console.log(result);
    setPostOrderStatus(null);
  } catch (error) {
    alert(error.message);
  }
}

  }
  const history = useHistory();
  return (
   <>
     <Button onClick={()=>history.goBack()} className="btn btn-primary" type="button"> Back</Button>
     <Row>
     {
       postOrders.map(order=>{
      let date = new Date(order.updatedAt);
        return (
        <>
        <Col lg={4} sm={6}>
          <Card>
          <Row>
          <Col lg={5}>

              <Link to={`/farmers/${order.Farmer.uuid}`}>
                <Card.Img variant="top" src={`http://localhost:5000/${order.Farmer.profileImage}`} alt='farmers picture' className='border' style={{borderRadius:"25px",marginLeft:'15px'}} height={"100px"} width={"100px"}/>
              </Link>
          </Col>
          <Col style={{alignSelf:"center"}}>
              <Card.Title>{order.Farmer.userName}</Card.Title>
          </Col>
          </Row>
            <Card.Body>{order.message}</Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Status: {order.status}</ListGroup.Item>
            </ListGroup>
            <Button onClick={()=>handleOrderSubmission(order.id,order.status)}>{postOrderStatus?('Accept'):('Move To Pending')}</Button>
            <Card.Footer>
            <small className="text-muted" style={{display:"block",fontSize:"11px",textAlign:"end"}}>Last updated {`${date.getDate()}/${(date).getMonth()+1}/${(date).getFullYear()}`}</small>
            </Card.Footer>
          </Card>
        </Col>
           </>
         )
       })
     }
    
     </Row>
   </>
  )
}

export default PostOrders