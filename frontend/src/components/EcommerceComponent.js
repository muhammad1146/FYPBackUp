import React from 'react'
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
const EcommerceComponent = ({cattle}) => {
    return (    
            <Card className='my-3 p-3 rounded' flush>
            
            <Link to={`/animals/${cattle.id}`} > 
            <Card.Img src={cattle.image[0]} 
            variant='top' alt='Animal Image' fluid 
            className='Cattle_Img_Container'/>
            </Link>
            <Link to={`/animals/${cattle.id}`}> 
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

export default EcommerceComponent
