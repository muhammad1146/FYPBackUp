import React,{useEffect, useState} from 'react'
import { convertFromHTML } from 'draft-convert';
import {EditorState, Editor} from 'draft-js';
const BodyEditor = ({answer}) => {
  const [editorState,setEditorState]= useState(EditorState.createEmpty());
useEffect(()=>{
  
    setEditorState(EditorState.push(editorState,convertFromHTML(answer)));
},[])
  return (
   <Editor readOnly={true} editorState={editorState} />
  )
}

export default BodyEditor