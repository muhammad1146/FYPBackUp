import React,{useContext, useEffect, useState} from 'react';
import {Row,Col, Container,Badge} from 'react-bootstrap'
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import BlogBody from '../Components/BlogBody';
import BlogComments from '../Components/BlogComments';
import {UserContext } from '../../Contexts/UserContext';
const Blog = () => 
{
const [user,setUser] = useContext(UserContext);
const [blogBody,setBlogBody] = useState();
const [blogImages,setBlogImages] = useState([]);
const [blogComments,setBlogComments] = useState([]);
const [blogReacts, setBlogReacts] = useState([]);
useEffect(() =>{
    let data = axios.get()
},[])

return (
    <>
    <BlogHeader />
    <BlogBody />
    <BlogCommentForm />
    <BlogComments />
    <BlogFooter />
    
    </>
    //1) Title image if there is any 
       //2) Title of blog
       //3) Text of blog
       //4) blog tags
       //5) Expert info
       //6) Reacts on blog
)

}

export default Blog;