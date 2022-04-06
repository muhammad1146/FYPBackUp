import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { Redirect, useHistory } from 'react-router';
import  './bootstrap.min.css'
import MainApp from './MainApp';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import Farmers from './Farmers/Screens/Farmers';
import Experts from './Experts/Screens/Experts';
import { useState } from 'react';
import FarmerProfile from './Farmers/Components/FarmerProfile';

function App() {
  // console.log("app rendered!!")
  const [user,setUser]= useState(()=>{
    if(Cookies.get("refreshToken")){
      try {
        let payload = jwt.verify(Cookies.get("refreshToken"),"refreshSecret");
        return payload;
      } catch (error) {
        console.log(error);
        return {};
      }
      
    }else {
      return {};
    }
  });
 
    const linking =( ) =>{
      try {

        console.log(Cookies.get("refreshToken"))
        let refreshToken = Cookies.get("refreshToken");
        if(refreshToken){
          let payload = jwt.verify(refreshToken,"refreshSecret");
          // console.log(payload)
          setUser(payload);
          console.log(payload)

        }
      } catch (error) {
        setUser({});
        console.log(error)
      }
    }
  let history= useHistory();
  return (
    <>
      <Router >
        <Header user={user} />
        <Container  fluid>
          <Switch>
            <Route exact path='/login' >
              <Login setUser={setUser} />
            </Route>
            <Route exact path='/register' component={Register} />
            <Route exact path='/farmers' component={()=>{
              if(user.type){
                return (<Farmers />)
              }else{
                return (<Redirect to='/login' />)
              }
            }} />
            <Route exact path='/experts' component={()=>{
              if(user.type){
                
                return (<Experts />)
              } else {
              
                return (<Redirect to='/login' />)
              }
            }} />

            <Route  path='/farmers/:username/' exact component={ ()=>(user? (<FarmerProfile user={user}/>): (history.push('/login'))) } />   
            {/* <Route  path='/experts/:username/' exact component={ ()=>(user? (Profile): (history.push('/login'))) } />    */}
            <Route path='/' >
            {
              user.type ? (<MainApp user={user} setUser={setUser} />):(
                <Redirect to='/login' />
              )
            }
            </Route>
          </Switch>
        </Container>
      </Router>
        <Footer/> 
  </>
  );
}


export default App;
