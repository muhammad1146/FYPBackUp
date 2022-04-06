import React,{useEffect} from 'react';
import {Row,Col, Container,Badge} from 'react-bootstrap'
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import MiniTag from '../Components/MiniTag';
const BlogBody = () => 
{
const TagScreen = ({tags}) => 
{
    return (
        tags.map = (tag) =>
        {
            <MiniTag tag={tag} />
        }
    )
}
return (
<Container>
    <div class='blog-top'>
        <h3>Title</h3>
        <span className="three-dots"> <BsThreeDotsVertical size="1.2rem" /> </span>
    </div>
    <Image src="holder.js/100px250" fluid />
        <p>
            text
        </p>
    
    <TagScreen />
    <Row noGutters>
        <Col className="footer-section" id="footer-section">
        <div className="blog-reacts"> Reacts  </div>
        </Col>
        <Col xs={9}>2 of 2 (wider) Blogger Info</Col>
    </Row>
</Container>
    
    //1) Title image if there is any 
       //2) Title of blog
       //3) Text of blog
       //4) blog tags
       //5) Expert info
       //6) Reacts on blog
)

}

export default BlogBody;