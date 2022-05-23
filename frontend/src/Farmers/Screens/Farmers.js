// This Screen is without the right side bar 
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card,Button, Container,Row,Col,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FarmerScreenCSS from './Farmers.module.css';
const Farmers = () => {
    console.log('reached farmers of src/farmers/screens and js')
    const [farmers,setFarmers] = useState([]);
    useEffect( async()=> {
       try {
           const result = await axios.get('/api/farmers/');
           console.log(result)
           if(result.data.content.length>0)
           setFarmers(result.data.content);
           else setFarmers(-1)
           
       } catch (error) {
           console.log(error)
       }
    },[]);
const FarmerContainer = ({farmer}) =>{
return(
    <Col sm={4}>
            <Card style={{ width: '18rem' }}>
            <div className='text-center mt-2'>
            <Link to={`/farmers/${farmer.uuid}`}>
            <Image variant="top" src={`/${farmer.profileImage}`} rounded width="170px" height="170px" className="text-center"/>
            </Link>
            </div>
            <Card.Body>
                <Link to={`/farmers/${farmer.uuid}/`}>
                <Card.Title>{farmer.userName}
                </Card.Title>
                </Link>
                <Card.Subtitle className="mb-2 text-muted">
                {farmer.farmingType}
                </Card.Subtitle>
                <Card.Text>
                {farmer.description}
                </Card.Text>
                <Card.Link href="#">{farmer.FarmersRank?.rankname}</Card.Link>
                <Card.Link href="#">{farmer.city}</Card.Link>
            </Card.Body>
            </Card>
    </Col>

)
}
    return (
        <div className='contentSection'>
        <Container className="border" style={{borderRadius:"20px", paddingBottom:'30px'}}>
        
            <h1 className={FarmerScreenCSS.h1}>Farmers</h1>
            <hr style={{marginTop:"30px"}} />
            <Row>
            {
                farmers.length>0
                ? farmers.map((farmer) =>(<FarmerContainer farmer={farmer} />) )
                :(<h2>Loading...</h2>)
                
            }
        </Row>
        </Container>
        </div>
    )
}

export default Farmers
