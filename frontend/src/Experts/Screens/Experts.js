import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card,Button, Container,Row,Col,Image,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ExpertScreenCSS from './Experts.module.css';
const Experts = () => {
    const [experts,setExperts] = useState([]);
    const [showRankToggle,setShowRankToggle] = useState(false);
    const [rank,setRank] = useState({});
    useEffect( async()=> {
        try {
            const result = await axios.get('/api/experts/');
            console.log(result)
            if(result.data.content.length>0)
            setExperts(result.data.content);
            else setExperts(-1)
            
        } catch (error) {
            console.log(error)
        }
     },[]);
    const ExpertsContainer = ({expert}) =>{
      let imageUrl = '/blankProfile.jpg';
      if(expert.profileImage && expert.profileImage.length>3){
          imageUrl = expert.profileImage;
      }
      const displayRank = (rank) =>{
            setRank(rank);
            setShowRankToggle(true);
      }
        return(
            <Col sm={4}>
            <Card style={{ width: '18rem' }}>
            <div className='text-center mt-2'>
            <Link to={`experts/${expert.uuid}`}>
            <Image variant="top" src={imageUrl} rounded width="170px" height="170px" className="text-center"/>
            </Link>
            </div>
            <Card.Body>
                <Link to={`experts/${expert.uuid}/`}>
                <Card.Title>{expert.name}
                </Card.Title>
                </Link>
                <Card.Subtitle className="mb-2 text-muted">
                {expert.farmingType}
                </Card.Subtitle>
                <Card.Text>
                {expert.description}
                </Card.Text>
                
                <Card.Text onClick={()=>displayRank(expert?.ExpertsRank)} >{expert.ExpertsRank.rankname}</Card.Text> 
                
                <Card.Text>
                <small>
                {expert.address}
                </small>
                </Card.Text> 
            </Card.Body>
            </Card>
            <Modal
            show={showRankToggle}
            onHide={()=>setShowRankToggle(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Expert Rank</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Title>{rank.rankname}</Card.Title>
                        <Card.Text>{rank.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setShowRankToggle(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </Col>
        )
        }
    return (
        <div className='contentSection'>
        <Container className="border" style={{borderRadius:"20px",paddingBottom:'30px'}}>
            <h3 className={ExpertScreenCSS.h1}>Experts</h3>
            <hr style={{marginTop:"30px"}} />
            <Row>
            {
                experts.length>0
                ? experts.map((expert) =>(<ExpertsContainer expert={expert} />) )
                :(<h2>Loading...</h2>)
                
            }
        </Row>
        </Container>
        </div>
    )
}

export default Experts
