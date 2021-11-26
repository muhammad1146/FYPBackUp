import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import { UserContext } from './Contexts/UserContext';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { useHistory } from 'react-router';
import Profile from './components/Profile';
import  './bootstrap.min.css'
import MainApp from './MainApp';
import { useContext } from 'react';

function App() {
const {user,setUser}= useContext(UserContext);
let history= useHistory();
  return (
    <>
  <Router >
    <Header />
{/* <UserContext.Provider value={user}> */}
<Container className='bg-info ' fluid>
   <Switch>
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    <Route  path='/profile/:username' exact component={ ()=>(user? (Profile): (history.push('/login'))) } />   
    <Route path='/' component={ MainApp } />   
   </Switch>
</Container>
    </Router>
    <Footer/>
  </>
  );
}


export default App;
