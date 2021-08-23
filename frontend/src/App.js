import Header from './components/Header'
import './App.css';
import {BrowserRouter as Router , Route, Switch,Redirect} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'
import Footer from './components/Footer'
import HomeScreen from './components/Screens/HomeScreen'
import Sidebar from './components/sidebar.js'
import Blog from './components/Blogs.js'
import Profile from './components/Screens/Profile';
import Users from './components/Screens/Users';
import QuestionScreen from './components/Screens/QuestionScreen'
import UnansweredScreen from './components/Screens/UnansweredScreen'
import TagsScreen from './components/Screens/TagsScreen'
import Ecommerce from './components/Ecommerce'
import UserDetail from './components/UserDetail'
import  './bootstrap.min.css'
import AnimalDetail from './components/AnimalDetail';
import Login from './components/Login'
import Register from './components/Register'
import { useState } from 'react';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
if(isLoggedIn){
return(
  <>
  <h1 className='text-center p-3'> CattleTalk-Authentication </h1>
<Container className='m-auto bg-success py-4 '>
<Router>
<Route path='/' component={() => (<Redirect to='/login' />)} exact/>
<Route path='/register' component={Register} exact/>
<Route path='/login' component={Login} exact/>

</Router>
</Container>
</>
)
}
else{

  
  return (
    <Router >
    <Header />
<Container fluid >
  <Row>
    <Col  lg='2' className='ps-absolute sidebarSection'>
        <Sidebar/>                            
    </Col>
    <Col lg="10" className="bg-light ">
    
      <main>
        <Switch>
        <Route  path='/' component={HomeScreen} exact/>
        <Route  path='/animals' component={Ecommerce}  />
        {/* <Route  path='/animals/:id' component={AnimalDetail} exact /> */}
        <Route  path='/home' component={HomeScreen}  />
        <Route  path='/profile' component={Profile} exact />
        <Route  path='/users' component={Users} exact />
        <Route  path='/questions' component={QuestionScreen}   />
        <Route  path='/tags' component={TagsScreen }    />
        <Route  path='/unanswered' component={UnansweredScreen}   />
        <Route  path='/blogs' component={Blog}   />
        <Route  path='/users/:id' component={UserDetail}   />
        </Switch>
      </main>
    </Col>    
  </Row>
</Container>
    <Footer/>
  </Router>
  );
}
}

export default App;
