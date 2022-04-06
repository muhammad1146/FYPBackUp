import React from 'react'
import { Card } from 'react-bootstrap'
const Answers = ({answers}) => {
    return (
        <>
        {answers.map(answer => {
    <Card>
        <Card.Subtitle className=" mt-2 mx-3 text-muted">Commentor Id</Card.Subtitle>
        <Card.Body>This is some text within a card body.</Card.Body>
    </Card>
        })}
    </>
    )
}

export default Answers
