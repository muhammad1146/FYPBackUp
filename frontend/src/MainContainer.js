import React from 'react'
import FarmerDiscussion from './Farmers/Screens/Discussion/DiscussionMain';
import Ecommerce from './Farmers/Screens/Ecommerce/EcommerceMain';
import FarmerBlog from './Farmers/Screens/Blogs/BlogMain';
import ExpertDiscussion from './Experts/Screens/DiscussionMain';
import ExpertBlog from './Experts/Screens/BlogMain';
import {Row,Col} from 'react-bootstrap'
import { Switch,Route,Redirect } from 'react-router';

const MainContainer = ({user,setUser}) => {
    
      return (
          <>
    <div className='h-70'>
        <Row className='m-0'>
        <Col lg={12} className="bg-light ">
        <main>
            <Switch> 
           
    <Route  path='/discussion' component={() =>{
            if(user.type==='F')
            {
                return( <FarmerDiscussion user={user} />)
            }
            else if(user.type==='E' || user.type==='A'){
                return( <ExpertDiscussion user={user} /> )
            }
            else {
                return (<Redirect to="/login" />)
            }
                   }} />
            
    <Route  path='/ecommerce' component={() =>{
           if (user.type==='F'){
          return ( <Ecommerce user={user} /> )  
           }  
           else{
              return (<Redirect to='/' />)
           }}} />
    <Route  path='/blogs/' component={() =>{
           if( user.type==='F'){
          return( <FarmerBlog user={user}/> )
           }
           else if(user.type==='E' || user.type==='A'){
          return ( <ExpertBlog user={user} /> ) 
           }
           else{
            <Redirect to='/login' />
           } 
            }} />
            </Switch>
        </main>
        </Col>    
        </Row>
    </div> 
        </>
    )
}
export default MainContainer
