import React from 'react'
import {Form,FormControl} from 'react-bootstrap'
const DiscussionSearchForm = (props) => {
    return (
        <>
    <Form >
    
                <FormControl type="text" placeholder="Search" className="mr-sm-2" inline onChange={props.handleSearchChange}/>
    </Form> 
        </>
    )
}

export default DiscussionSearchForm
