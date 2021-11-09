import React from 'react'
import {Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card'

const Tag = () => {
    return (
        <>
            <Card className='mb-2'>
                <Card.Title>
                    <LinkContainer to='/' > 
                    {/* <a href="#" className="btn btn-secondary stretched-link w-100">Tag</a> */}
                   <Badge  className='p-2 w-auto rounded'>Tag</Badge>
                    </LinkContainer>

                </Card.Title>
                <Card.Body className='p-1 text-center'>
                  <Card.Text >
                    Description:Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>  
                </Card.Body>
                <Card.Text className='text-muted w-75'>
                    1799 questions
                </Card.Text>
                <Card.Footer className='text-muted'>
                    updated 3 mins ago
                </Card.Footer>
            </Card>
         
             
             
             
         
        </>
    )
}

export default Tag
