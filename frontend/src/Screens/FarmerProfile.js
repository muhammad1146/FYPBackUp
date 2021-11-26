// This Screen is without the right side bar 
import React,{useState,useEffect} from 'react'
import '../../App.css';
import axios from 'axios';
import FarmerFarms from '../Components/FarmerFarms';
import FarmerExperience from '../Components/FarmerExperience';
import { Container } from 'react-bootstrap';
const userName = props.match.params.userName;
const FarmerProfile = () => {
    const [farmerPersonal,setFarmerPersonal] = useState([]);
    useEffect(() =>{
        let data = axios.get()
    },[]);
    
    
    
    const Bio = ({farmerPersonal}) => {
        return (
        <>
            <h1>Farmer Profile</h1>
                <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        Profile Data
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>abc</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>def</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>03xxxxxxx</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>Admin/Expert</td>
                        </tr>
                        
                        <tr>
                            <td>Address</td>
                            <td>...</td>
                        </tr>
                        
                        <tr>
                            <td>Description</td>
                            <td>...</td>
                        </tr>

                        <tr>
                            <td>Rank</td>
                            <td>...</td>
                        </tr>

                    </tbody>
                </Table>
                </div>
            <div className="">
                <Image src="" rounded fluid />
            </div>
        </>
        )
    }
    return (
        <div className='contentSection'>
        <Container>
         <Bio farmerPersonal />   
        <FarmerExperience />
        <FarmerFarms />
        </Container>
        </div>
        
    )
}

export default FarmerProfile
