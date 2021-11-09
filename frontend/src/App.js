import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch,Redirect} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'
import { UserContext } from './Contexts/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Components/Login';
import Profile from './Components/Profile';
import  './bootstrap.min.css'
import MainApp from './MainApp';
function App() {
  const user = {
    id:null,
    type:null,
    userName: null,
    token:null
  }
const [isLoggedIn, setIsLoggedIn] = useState(false);
// if(isLoggedIn){
// return(
//   <>
//   <h1 className='text-center p-3'> CattleTalk-Authentication </h1>
// <Container className='m-auto bg-success py-4 '>
// <Router>
// <Route path='/' component={() => (<Redirect to='/login' />)} exact/>
// <Route path='/register' component={Register} exact/>
// <Route path='/login' component={Login} exact/>
// </Router>
// </Container>
// </>
// )
// // }
// else{  
  return (
    <>
    <Header />
  <Router >
<UserContext.Provider value={user}>
   <Switch>
    <Route exact path='/login' component={<Login />} />
    <Route  path='/profile/:username' exact component={ <Profile/> } />   
    <Route path='/' exact component={ <MainApp />} />   
   </Switch>
</UserContext.Provider>
  </Router>
    <Footer/>
  </>
  );
}


export default App;
