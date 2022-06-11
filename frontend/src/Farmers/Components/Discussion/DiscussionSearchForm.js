import React, { useState } from 'react'
import {Button, Form,FormControl} from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router';
const DiscussionSearchForm = ({setText}) => {
    const location = useLocation();
    console.log('location:', location);
    const history = useHistory();

    console.log('histroy:', history);
      let timer = null;
      const customFunction = (value) =>{
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            setText(value)
        },900)
      }
    
    return (
        <>
    <Form >
            <FormControl style={{borderRadius:'25px',display:'inline'}} type="text" placeholder="Search" className="mr-sm-2" inline onChange={(e)=>customFunction(e.target.value)}
            />
    </Form> 
        </>
    )
}

export default DiscussionSearchForm
