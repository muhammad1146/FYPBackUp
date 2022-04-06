import React, { useState,useEffect, useContext } from 'react'
import {Formik} from 'formik'
import axios from 'axios';
import * as yup from 'yup';
import { ImCross } from "react-icons/im";
import {Form,Row,Col,Image,Button,Modal} from "react-bootstrap"
import { UserContext } from '../../../Contexts/UserContext';
import { useHistory } from 'react-router';
let validationSchema = yup.object().shape({
  name:yup.string().required(),
  price:yup.number().required(),
  cattleType:yup.string().required(),
  description:yup.string().required(),
  weight:yup.number().required(),
  cattleImages:yup.string()
});
const PostForm = ({postFormToggle,setPostFormToggle}) => {
  let history = useHistory();
  const {user} = useContext(UserContext);
  let [images,setImages] = useState([]);
  let [imageUrls,setImageUrls] = useState([]);
  let [error, setError] = useState('');
  let token = user.token;
  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };
  useEffect(() => {
    if(images.length<1) return;
    let newImageURLs = images.map(img =>{
        return URL.createObjectURL(img);
    })
    setImageUrls(newImageURLs);
}, [images]);

  return(
<>
<Modal show={postFormToggle} className="post_modal" onHide={()=>setPostFormToggle(false)}>

<Formik
initialValues= {{
    name: '',
    price: 0,
    weight: 0,
    cattleType: '',
    description: '',
    city:'',
    cattleImages:{}
  }}
  validationSchema={validationSchema}
  
  onSubmit ={ async (values,actions)=>{
    console.log("entered submission!")
    let data = new FormData();
    try
    {
    data.append("name",values.name);
    data.append("price",values.price);
    data.append("weight",values.weight);
    data.append("description",values.description)
    data.append("cattleType",values.cattleType);
    data.append("city",values.city);
    images.forEach(file=>{
      data.append("cattleImages",file);
    })
    console.log(token);
   let result =  await axios(
     {
        method: "POST",
        url: "/api/ecommerce/",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token" : `Bearer ${token}`
        }
      });
    }
    catch(error){
      setError(error.response.data)
      return;
    }
    alert("Post Submitted Successfully!");

   actions.resetForm();
   history.push('/ecommerce')
    
  }}
>
{(props) =>(

<Form  onSubmit={props.handleSubmit}>
<h3>Post Form</h3>

<h5>{error}</h5>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridName">  
      <Form.Control type="name" placeholder="Cattle Name"  
        name="name" onChange={props.handleChange}/>
      <small className="text-danger"> {props.errors.name} </small>
    </Form.Group>

  </Row>
  <Row>
    <Form.Group as={Col} controlId="formGridPrice" className="mb-3">
  {/* <Field type="number" name="price" placeholder="price" /> */}
      
      <Form.Control type="number" 
      placeholder="Price" 
      name="price" onChange={props.handleChange}
       />
      <small className="text-danger"> {props.errors.price} </small>

    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGriddescription">
    <Form.Control 
    placeholder="Description of Cattle" onChange={props.handleChange} name="description" />
      <small className="text-danger"> {props.errors.description} </small>
  </Form.Group>
  <Row className="mb-3">
    <Form.Group as={Col}  controlId="formGridWeight">
      <Form.Control placeholder="Weight" name="weight" onChange={props.handleChange} type="number"/>
      <small className="text-danger"> {props.errors.weight} </small>    
    </Form.Group>
  </Row>
  <Row>
  <Form.Group as={Col} controlId="formGridType" className="m-3" >
      <Form.Label className="mr-4">CattleType:</Form.Label>
      <Form.Select defaultValue="Choose..." name="cattleType" onChange={props.handleChange} >
        <option>Cow</option>
        <option>Goat</option>
      </Form.Select>
      <small> {props.errors.cattleType} </small>
    </Form.Group>
    </Row>
    <Row>
  <Form.Group as={Col} controlId="formGridCity" className="m-3" >
      <Form.Label className="mr-4">City:</Form.Label>
      <Form.Select defaultValue="Choose..." name="city" onChange={props.handleChange} >
        <option>Attock</option>
        <option>Rawalpindi</option>
      </Form.Select>
      <small> {props.errors.city} </small>
    </Form.Group>
    </Row>
  <Form.Group controlId="formFileSm" className="mb-3">
    
    <Form.Control type="file" size="sm"   multiple onChange={(e) =>{
      props.setFieldValue("cattleImages",e.target.files); onImageChange(e);
    }} name="cattleImages"/>
      <small> {props.errors.cattleImages} </small>
  
  </Form.Group>
  <Row>
  {imageUrls.map((url,i)=>{
      return (
          <Col className="m-1 " >
         <div className='post-image-container'>
          <div className='post-image-cross'> 
          <ImCross  size='1rem' 
          onClick={()=>setImageUrls((prev)=>prev.filter(i=>i!=url)
      )} />
          </div>
          <Image key={i} src={url}  width="100px" height="100px" />
         </div>
          </Col>
      )
    })}
  </Row>
   
  <Button variant="primary" type="submit" className='ml-4'>
    Submit
  </Button>
  {/* <pre>{JSON.stringify(props.values,null,2)}</pre> */}
  
  
  
</Form>

)}
</Formik>
</Modal>
</>
)
}

export default PostForm;

