import React, { useEffect, useState } from 'react'
import {BsTriangle ,BsTriangleFill} from 'react-icons/bs'; 
import { useParams } from 'react-router';
import axios from 'axios';
const Reacts = ({reacts,user}) => {
  console.log('what is wrong with the question reacts? :',reacts);
  const {qid} = useParams('qid');
  const [votes,setVotes] = useState(()=>{
   let ups = 0,down = 0;
   reacts?.forEach(i=>{
     if(i.commitType==='UP'){
       ups++;
     }else{
       down++;
     }
   });
   return ups-down;
  })
  const [commitType,setCommitType] = useState(()=>{
      for(let i=0;i<reacts.length;i++){
        if(reacts[i].Farmer.uuid===user.uuid){
          return  reacts[i].commitType;
        }
      }
      return undefined;
  });
  const postReact = async(text) =>{
    try {
      
      if(commitType!==undefined){
        let previousReacts = await axios.delete(`/api/questions/${qid}/reacts`);
        if(previousReacts.status!==200){
          alert("Internal server error!");
        }
      }
      let result = await axios.post(`/api/questions/${qid}/reacts`,{
        commitType:text
      });
      if(result.status===200){
        if(text==='UP'){
          setVotes(v=> {
            if(v===-1){
              return 1;
            }
            else{
            return v+1;  
            }
            });
          setCommitType('UP');
        }else{
          setVotes(v=>v-1);
          setCommitType('DOWN');
        }
      }
    } catch (error) {
      alert(error.message);
    }
  } 
  return (
    <>
      <div>{commitType===undefined || commitType==="DOWN"?(<BsTriangle onClick={()=>postReact('UP')} style={{cursor:'pointer'}}/>):(<BsTriangleFill />)}</div>
      <span>{votes}</span>
      <div>{commitType===undefined || commitType==="UP"?(<BsTriangle onClick={()=>postReact('DOWN')} style={{cursor:'pointer',transform:'rotate(180deg)'}} />):(<BsTriangleFill  style={{transform:'rotate(180deg)'}} />)}</div>
    </>
  )
}

export default Reacts