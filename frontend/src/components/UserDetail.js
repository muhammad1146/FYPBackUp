import React from 'react'
import { Container,Card,ListGroup,Image, Col,Row} from 'react-bootstrap'
import { RiTodoFill } from "react-icons/ri";
const UserDetail = () => {
    return (
        <Container>
        <Row>
            <Col md={8}>
            
            <Card border="primary" style={{ width: 'auto' }}>
            <Card.Header>Farm Name</Card.Header>
            <Card.Body>
                <Card.Title>Farm Type</Card.Title>
                <Card.Text>Location and Address
                </Card.Text>
                <ListGroup variant="flush">
            <ListGroup.Item>Number Of Animals: </ListGroup.Item>
            <ListGroup.Item>Area of Farm:</ListGroup.Item>
            <ListGroup.Item>Date of Creation:</ListGroup.Item>
            </ListGroup>
            </Card.Body>
            </Card>

            <Card border="primary" style={{ width: 'auto' }}>
            <Card.Header>Farm Name</Card.Header>
            <Card.Body>
                <Card.Title>Farm Type</Card.Title>
                <Card.Text>Location and Address
                </Card.Text>
                <ListGroup variant="flush">
            <ListGroup.Item>Number Of Animals: </ListGroup.Item>
            <ListGroup.Item>Area of Farm:</ListGroup.Item>
            <ListGroup.Item>Date of Creation:</ListGroup.Item>
            </ListGroup>
            </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Row>
                <Col>
                    <Image src="" alt='Profile Picture' roundedCircle />
                    <Card>
                    <Card.Body>
                    <Card.Header>
                        Rank  
                    </Card.Header>
                        <Row>
                            <Col>
                                Name:
                            </Col>
                            
                            <Col>
                                ___
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Email:
                            </Col>
                            <Col>
                                ___
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Farming:
                            </Col>
                            <Col>
                                ___
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Phone Number:
                            </Col>
                            <Col>
                                ___
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                Likes:__
                            </Col>
                            <Col>
                                Total Review: __
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                </Col>
            </Row>
            </Col>
        </Row>
        
        </Container>
    )
}

export default UserDetail
