import React, { useContext, useEffect, useState } from 'react'
import {Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { UserContext } from '../../../Contexts/UserContext'

const Tag = () => {
    const [tags, setTags] = useState([]);
    const [user,setUser] = useContext(UserContext);
    useEffect(() => {
        const result = axios.get('',{headers:{'auth-token':`Bearer ${user.token}`}});
        setTags(result);
    },[])
    const TagStructure = (props) => {
        return (
            <Card className='mb-2'>
                <Card.Title>
                    <LinkContainer to='/' > 
                   <Badge  className='p-2 w-auto rounded'>tag</Badge>
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
        )
    }
    return (
        <>
         {tags.map(tag =>{
             return( <TagStructure tag={tag} /> )
         })}   
         
             
             
             
         
        </>
    )


}

export default Tag
