import React,{useState,useEffect} from 'react'
import { Container,Table,Button,Image, Col,Row} from 'react-bootstrap'
import axios from 'axios';
const FarmerProfile = (props) => {
    const userName = props.match.params.userName;
    const token = props.token;
    const [farmerData,setExpertData] = useState();
    const [farmerQualification,setFarmerQualification] = useState();
    const [farmerExperience,setFarmerExperience] = useState();

    useEffect(() =>{
    const result = axios.get(`http:localhost/5000/farmers/${userName}`,{headers:{'auth-token':`Bearer ${token}`}});
    setExpertData(result);
});


    return (
    <Container>
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
<Row>
    Qualification
    <Col>
        <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Qualification</th>
                    <th>Duration</th>
                    <th>Percentage</th>
                    <th>Institution</th>
                    <th>Delete</th>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    
                </tbody>
        </Table>
    </Col>
</Row>
<Row>
<Col><Button>Add Education</Button></Col>
 </Row>

<Row>
    Experience
    <Col>
        <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Institute</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Position</th>
                    <th>Delete</th>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    
                </tbody>
        </Table>
    </Col>
</Row>
<Row>
    <Col><Button>Add Experience</Button></Col>
</Row>


    </Container>
    )
}

export default FarmerProfile
