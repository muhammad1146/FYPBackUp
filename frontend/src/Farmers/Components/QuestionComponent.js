import React from 'react'
import {Card,Row,Col, Container} from 'react-bootstrap'
import MiniTag from './MiniTag'
const QuestionComponent = () => {
    const state = 1;
    if (state===1){
        return (
            <Container fluid className='border rounded grey'>
    <Row className='bg-secondary p-1 m-2 rounded bg-warning'>
            <Col lg='2' className='mh-100'>
                <Row>
                <Col className='mh-100'>
                <Card className='mh-100 mt-3'>
                  <Card.Body>
                      <Card.Text as = 'div' className='my-2 py-2 mh-100'>
<span> 0 </span>
                    Votes
                      </Card.Text>
                      <Card.Text as = 'div' >
                      <span>0 </span>Answer
                      </Card.Text>
                    
                      </Card.Body>  
                </Card>
                </Col>                          
                </Row>
            </Col>
        <Col className='m-0 pl-0'>
                <Card >
                    <Card.Body>
                        <Card.Title>Question Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <MiniTag/>

                        <div className='float-right p-1 mx-1 border'>
                             <div id='QuestionPostDate' className='p-1 float-left w-100'>
                                <small>

                                         asked 3hrs ago

                                </small>
                             

                             </div>
                             <div className=''>
                                 <img src='' alt='UserImg'/>
                             </div>
                       <div id='UserImageContainer' className='float-left '>
                        <small>

                        Sinner
                        </small>

                       </div>
                        
                    </div>  
                                
                                
                        </Card.Body>
                          
                        </Card>
        </Col>
    </Row>
        </Container>
    )
}
else {
    return (
        <>
    <Row className='m-2'>
        <Col lg='2' className='bg-info p-1'>
            <Row>
                <Col>
            Ranking1
                </Col>
            </Row>
            <Row>
                <Col>
            Ranking2
                </Col>
            </Row><Row>
                <Col>
            Ranking3
                </Col>
            </Row>
        </Col> 
        <Col >
<Row>
    <Col lg='12' className='bg-success p-1'>
          <div className='p-1'>
             <h4>
                    Question Title
                 </h4> 
          </div>
          <div className='p-1'>
              <p>
                  Question Text
                  </p>
          </div>
          <MiniTag/>
          <div className='float-right'>
              User's Info
          </div>
    </Col>
</Row>
        </Col>  
    </Row>
    </>)
}
}

export default QuestionComponent
