import React, { useState,useEffect } from 'react'
import { Container,Row,Col,Nav,NavDropdown, FormControl,Button } from 'react-bootstrap'
import EcommerceComponent from './EcommerceComponent'
import ECurrentPosts from './ECurrentPosts'
import SellerForm from './sellerForm'
import AnimalDetail from './AnimalDetail'
import '../App.css'
import { RiMapPinUserFill } from "react-icons/ri";
import { LinkContainer } from 'react-router-bootstrap'
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import { AiOutlineForm } from "react-icons/ai";
import axios from 'axios'
const Ecommerce = () => {
    const [Cattle, setCattle] = useState([])
    useEffect(() => {
        const fetchAnimals = async () => {
            const {data} = await axios.get('/api/animals')
            setCattle(data)
        }
        fetchAnimals()
    }, [])
    const cities = ["Attock", "Rawalpindi", "Peshawar","Taxila"]
    const Type = ["Bakra", "Cow","Sheep"]
    const [TypeState, setTypeState] = useState("");
    const [CityState, setCityState] = useState("");
    const InflateData = () =>{
        if(CityState==="" && TypeState===""){
            return (
                Cattle.map(cattle =>(
                <Col lg='3'>
            <EcommerceComponent cattle={cattle} />
                </Col>  )))
        }
        else if(TypeState!="" ){ // type is set but city is not set
            return (
                Cattle.filter(cattle =>(cattle.cattle_type===TypeState)).map(filtered =>(
                    <Col lg='3'>
            <EcommerceComponent cattle={filtered} />
                </Col>
                ))
            )
        }
        else if(CityState!="" && TypeState===""){ // Type is not set but city is set
            return(
                Cattle.filter(cattle =>(cattle.city===CityState)).map(filtered =>(
                    <Col lg='3'>
            <EcommerceComponent cattle={filtered} />
                </Col>
                ))
            )
        }
        else {
            return(
        Cattle.filter(cattle =>(cattle.city===CityState && cattle.cattle_type===TypeState)).map(filtered =>(
               <Col lg='3'>
            <EcommerceComponent cattle={filtered} />
            </Col>
               )
            ))
        }
    }
    return (
        <>
        <h3>Ecommerce</h3>
        <Container className='border '>
            <Nav   variant="tabs"  defaultActiveKey='1' className='border px-3 bg-info'>
                <Nav.Item className='pt-3' onClick={()=>{setCityState("");setTypeState("")}}>
                    <Nav.Link  eventKey='1'> All Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item className=''>
                <Nav.Link eventKey="2">
                    <NavDropdown  
                    id="nav-dropdown" 
                    title="City" 
                    onChange={event =>{setCityState(event)}} defaultValue={CityState}
                    className='color-info'
                    >
                    { cities.map((e,i) => <NavDropdown.Item  eventkey={`2.${i}`} onClick={()=>{setCityState(e)}}>{e}
                    </NavDropdown.Item>)}
                    </NavDropdown>
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="3" >
                    <FormControl as='select' onChange={ event => { setTypeState(event.target.value)}} >
                       { Type.map(e=> <option>{e}</option> )}
                    </FormControl>
                    
                     </Nav.Link>
                </Nav.Item>
                <Nav.Item className='mx-1 ml-auto '>
                    <LinkContainer to='animals/myposts'>
                   <Button className="mt-1 " variant='success'>
                   <RiMapPinUserFill size='1.2rem'/>   My Posts                    
                       </Button> 
                     </LinkContainer>
                </Nav.Item>
                
                
                <Nav.Item className='m-0 '>
                    <LinkContainer to='/animals/sellform' >
                    <Button className='mt-1' variant='success'><AiOutlineForm size='1.2rem'/>Make Post</Button> 
                     </LinkContainer>
                </Nav.Item>
            </Nav>
            </Container>  
        <Container className='bg-secondary border rounded'>
        
     <Switch> 
            <Route path='/animals' component={()=>(<div className='contentSection'>
                <Row>
                <InflateData />
                </Row>
        </div>)} exact />
        <Route path='/animals/myposts' component={ECurrentPosts}   />
        <Route path='/animals/sellform' component={withRouter(SellerForm)}   />
        <Route path='/animals/:id' component={AnimalDetail}  />
    </Switch>
        
       <p>{TypeState}</p>
       <p>{CityState}</p>
       
</Container>
</>
    )
}

export default Ecommerce
