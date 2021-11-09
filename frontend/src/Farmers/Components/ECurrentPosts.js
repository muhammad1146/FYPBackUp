import React from 'react'
import {Card,Row,Col} from 'react-bootstrap'
import Cattle from '../data/cattleForSale'
import {Link} from 'react-router-dom'
const ECurrentPosts = () => {
    const MyPosts= Cattle.filter(cattle => (cattle.city==='Attock'));
    const ECurrentPost = ({cattle}) => {
        return (
                <Card className='my-3 p-3 rounded' flush>
                <Link to={`/animals/myposts/${cattle.id}`} > 
                <Card.Img src={cattle.image[0]} 
                variant='top' alt='Animal Image' fluid 
                className='Cattle_Img_Container'/>
                </Link>
                <Link to={`/animals/myposts/${cattle.id}`}> 
                <Card.Title   > 
                {cattle.cattle_type}
                </Card.Title>
                </Link>
                <Card.Text as='h6' className='mr-auto'>
                  City: {cattle.city}
                </Card.Text>
                <Card.Text as='h3'>
                  Rs:{cattle.price}
                </Card.Text>
                </Card>  
        )
    }    
    return (
        <Row>
           {MyPosts.map(c => (
               <Col lg='4'> 
               <ECurrentPost cattle={c} />
               </Col>
           ))} 
        </Row>
    )
}
export default ECurrentPosts
