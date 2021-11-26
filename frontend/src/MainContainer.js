import React,{useContext} from 'react'
import FarmerDiscussion from './Farmers/Screens/DiscussionMain';
import Ecommerce from './Farmers/Screens/EcommerceMain';
import FarmerBlog from './Farmers/Screens/BlogMain';
import ExpertDiscussion from './Experts/Screens/DiscussionMain';
import ExpertBlog from './Experts/Screens/BlogMain';
import {Container,Row,Col} from 'react-bootstrap'
import { Switch,Route,Redirect,useHistory } from 'react-router';
import { UserContext } from './Contexts/UserContext';

const MainContainer = () => {
    const {user} = useContext(UserContext);
    
      return (
          <>
    <Container fluid className=' h-70'>
        <Row>
        <Col lg={12} className="bg-light ">
        <main>
            <Switch> 
           
    <Route  path='/discussion' component={() =>{
            if(user.type==='F')
            {
                return( <FarmerDiscussion />)
            }
            else if(user.type==='E' || user.type==='A'){
                return( <ExpertDiscussion /> )
            }
            else {
                return (<Redirect to="/login" />)
            }
                   }} />
            
    <Route  path='/ecommerce' component={() =>{
           if (user.type==='F'){
          return ( <Ecommerce /> )  
           }  
           else{
              return (<Redirect to='/' />)
           }}} />
    <Route  path='/blogs' component={() =>{
           if( user.type==='F'){
          return( <FarmerBlog /> )
           }
           else if(user.type==='E' || user.type==='A'){
          return ( <ExpertBlog /> ) 
           }
           else{
            <Redirect to='/login' />
           } 
            }} />
            </Switch>
        </main>
        </Col>    
        </Row>
    </Container> 
        </>
    )
}



export default MainContainer
