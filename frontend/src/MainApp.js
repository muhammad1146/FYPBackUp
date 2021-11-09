import React,{useEffect, useState} from 'react'
import FarmerDiscussion from './Farmers/Screens/DiscussionMain';
import Ecommerce from './Farmers/Screens/EcommerceMain';
import FarmerBlog from './Farmers/Screens/BlogMain';
import ExpertDiscussion from './Expert/Screens/DiscussionMain';
import ExpertBlog from './Experts/Screens/BlogMain';
import {Container,Row,Col} from 'react-bootstrap'
const MainApp = () => {
  
    return(   
        <Container fluid >
  <Row>
    <Col  lg='2' className='ps-absolute sidebarSection'>
      <Sidebar/>                            
    </Col>
    <Col lg="10" className="bg-light ">
      <main>
        <Switch>
        <Route  path='/' component={FarmerDiscussion} exact/>
        <Route  path='/ecommerce' component={Ecommerce}  />
        <Route  path='/discussion' component={FarmerDiscussion}   />
        <Route  path='/blogs' component={FarmerBlog} />
        {/* <Route  path='/animals/:id' component={AnimalDetail} exact /> */}
        {/* <Route  path='/home' component={HomeScreen}  /> */}
        {/* <Route  path='/profile' component={Profile} exact /> */}
        {/* <Route  path='/users' component={Users} exact /> */}
        {/* <Route  path='/tags' component={TagsScreen }    /> */}
        {/* <Route  path='/unanswered' component={UnansweredScreen}   /> */}
        {/* <Route  path='/users/:id' component={UserDetail}   /> */}
        </Switch>
      </main>
    </Col>    
  </Row>
</Container>

)
}


export default MainApp;