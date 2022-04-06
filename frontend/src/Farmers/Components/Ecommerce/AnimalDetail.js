import React,{useEffect, useState} from 'react'
import { Image,Row,Col, ListGroup, ListGroupItem, Container,Card, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Cattle from '../data/cattleForSale'
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios'
import CommentSection from './CommentSectionAD'
import { AiFillPhone,AiOutlineUser } from "react-icons/ai";
const   AnimalDetail = ({match}) => {
    const [Animal,setAnimal] = useState({})
    const Id = parseInt(match.params.id)
   // const Animal= Cattle.find((animal) => animal.id===Id);
    useEffect(()=>{
            const fetchAnimal = async () => {
                const {data} = await axios.get(`/api/animals/${Id}`)
               setAnimal(data)
               setImages(data.image)
               setImageState(data.image[0])
             }
           fetchAnimal()
            
     },[])
    //  useEffect(()=>{
    //     //  img =Object.values(Animal.image).map(i =>[i, Animal.image[i]]  )
    //     //  if(Animal){
    //     //      setImageState(Object.values(Animal.image)[0])
    //     //  } 
    //  })
    

    const [imageState, setImageState] = useState ('');
    const [images, setImages] = useState('')
     
    const changeImage =(image) =>{
        setImageState(image)
    }
    if(Animal){
        return (
            <>
         <Link className='btn btn-dark my-3' to='/animals'> Back </Link>
         <Row className='border' >
        <Col lg='6' className='text-center my-auto' >
            <Image src ={process.env.PUBLIC_URL + imageState}  
            alt={Animal.cattle_type} fluid
            className='Image my-auto' rounded
            />
            <Row className='my-2'>
                {Object.values(images).map((I) =>(
                    <Col lg='3'>
                        <Card className='bg-info'>
                        <Link>
                        <Card.Img src={process.env.PUBLIC_URL+ I} alt={I} onClick={()=>changeImage(I)}/>
                        </Link>
                        </Card>
                    </Col>

                ))}
                
            </Row>  
            </Col>
                <Col  lg='3 my-auto mx-2 py-3'   >
                <ListGroup >
                    <ListGroupItem>
                           <span>Rs:
                            {Animal.price}
                            </span>
                    </ListGroupItem>
                    <ListGroupItem>
                        Type:{Animal.cattle_type}
                    </ListGroupItem>
                    <ListGroupItem>
                        Breed: {Animal.breed}
                    </ListGroupItem>
                    <ListGroupItem>
                        Weight:{Animal.weight}KG
                    </ListGroupItem>
                    <ListGroupItem>
                        Description:{Animal.description}
                    </ListGroupItem>
                    <ListGroupItem>
                        Status:{Animal.isAvailable ? 'Available' : 'Sold' }
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button className='btn btn-block' type='button' disabled={!Animal.isAvailable}>
                        Request Owner
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col>
            <ListGroupItem>
                <Card className='p-2'>
                    <Card.Title>Seller Description</Card.Title>
                    <Card.Text className='m-1'>  
                    <AiOutlineUser size='1.7rem' className='m-0 p-0'/>
                        UserName</Card.Text>
                    <Card.Text> member since currentDate</Card.Text>
                    <Card.Text>03115363388 <AiFillPhone size='1.3rem'/></Card.Text>
                    <LinkContainer to='/users/1'>
                    <Button variant='primary'>Visit User</Button>
                    </LinkContainer>
                </Card>
            </ListGroupItem>
            </Col>
        </Row>
        <CommentSection />      
        </>
    )
}
else{
    return (
        <h3>Loading...</h3>
    )
}
}
export default AnimalDetail
