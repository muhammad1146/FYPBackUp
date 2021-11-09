import React from 'react'
import MiniTag from '../MiniTag'
import {Row,Col} from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <>
       <Row > 
           <Col >
           
        <div className='contentSection'>
            <h3>Top Questions</h3>
            <p>Display property Quickly and responsively toggle the display value of components and more with 
                our display utilities. Includes support for some of the more common values,
                 as well as some extras for controlling display when printing.</p>
                 <MiniTag/>
                 <MiniTag/>
        </div>
           </Col>
       
       </Row>
    </>
    )
}

export default HomeScreen
