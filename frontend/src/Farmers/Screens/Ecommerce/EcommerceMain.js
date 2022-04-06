import React,{useEffect,useContext, useState} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter, Link} from 'react-router-dom'
import { UserContext } from '../../../Contexts/UserContext';
import EcommerceNavbar from '../../Components/Ecommerce/EcommerceNavbar';
import Post from './Post';
import Posts from './Posts';
import PostOrders from './PostOrders';
import PostForm from '../../Components/Ecommerce/PostForm'
import MyPosts from './MyPosts';
const EcommerceMain = ({user}) => 
{
    const [postFormToggle,setPostFormToggle] = useState(false);
    const [cattleType,setCattleType] = useState('All');
    const [city,setCity] = useState('All');

const EcommerceContainer = ({city,cattleType,user}) =>
{
        return (
        <>
        <PostForm postFormToggle={postFormToggle} setPostFormToggle={setPostFormToggle} />
        <Container>

            <EcommerceNavbar postFormToggle={postFormToggle} setPostFormToggle={setPostFormToggle} />
            <Switch> 
                <Route path='/ecommerce/all'  exact >
                    <Posts city={city} cattleType={cattleType} setCattleType={setCattleType} setCity={setCity} />
                </Route>
                {/* <Route path='/ecommerce/top'  >
                    <Posts city={city} cattleType={cattleType}/>
                </Route> */}
                <Route path='/ecommerce/my' >
                    <MyPosts />
                </Route>
                <Route path='ecommerce/posts/:pid/order' exact component={PostOrders} />
                <Route path='/ecommerce/:pid' exact render={(prevProps)=> <Post user={user} {...prevProps} />
                } />
                    
                         
            </Switch>
        </Container>
        </>
        )
    }
    return (
      <>

            
            {/* <Col lg={10} xl={10}>  */}
            <EcommerceContainer city={city} cattleType={cattleType}/> 
            {/* </Col> */}
      </>
    );
}
export default EcommerceMain;