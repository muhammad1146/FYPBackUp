import React,{useState,useEffect} from 'react'
import ExpertExperience from './ExpertExperience';
import ExpertQualification from './ExpertQualification';
import { Table,Image,Container } from 'react-bootstrap';
import axios from 'axios';
const ExpertProfile = (props) => {
    const userName = props.match.params.userName;
    const token = props.token;
    const [expertData,setExpertData] = useState({});
    
useEffect(() =>{
    const result = axios.get(`http:localhost/5000/${userName}`,{headers:{'auth-token':`Bearer ${token}`}});
    setExpertData(result);
},[]);

const Bio = ({expertData}) => {
    return(
    <>
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
    <Container>
    <Bio expertData />
    <ExpertQualification />
    <ExpertExperience />
    </Container>
    )
}

export default ExpertProfile
