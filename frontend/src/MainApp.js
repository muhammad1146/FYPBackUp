import React,{useContext, useEffect, useState} from 'react'
import jwt from 'jsonwebtoken';
import {Container,Row,Col,Nav,Button,} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import MainContainer from './MainContainer';
import { Toaster, toast } from 'react-hot-toast';
const MainApp = ({user,setUser}) => {
  let history = useHistory();                                                       
        if(Cookies.get("accessToken") || Cookies.get('refreshToken')){  // logged in 
          if(!user.type && Cookies.get('refreshToken')){
            let payload = jwt.verify(Cookies.get('refreshToken'),"refreshSecret");
            setUser(payload);
          }
            return(               
              <>
              <MainContainer user={user} setUser={setUser} />
              <Toaster position='bottom-right'/>
              
              </>            
            ) 
      }
        else{
        history.push('/login');
        return (
          <>
          </>
        )
      }
}


export default MainApp;