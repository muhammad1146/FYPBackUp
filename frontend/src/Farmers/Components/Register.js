import React,{useState} from 'react'
import {Form,Button,InputGroup,Col,Row,ButtonGroup,ToggleButton} from 'react-bootstrap'

const Register = () => {
const [userType, setUserType] = useState('');
    return (
<>
    <Form>

    <ButtonGroup toggle>
          <ToggleButton
            key='1'
            type="radio"
            variant="warning"
            name="radio"
            value="farmer"
            
            onChange={(e) => setUserType(e.currentTarget.value)}
            className='mx-3'
          >
            Farmer
          </ToggleButton>
          <ToggleButton
            key='2'
            type="radio"
            variant="warning"
            name="radio"
            value="Vet"
            
            onChange={(e) => setUserType(e.currentTarget.value)}
          >
            Vet
          </ToggleButton>
    
      </ButtonGroup>
   
    <h2>{userType} Registration</h2>
        <Form.Row>
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                 required
                 type="text"
                 placeholder="First name"
                 block
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg="12" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    block
                    />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} lg="12" controlId="validationCustomUsername">
                 <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please choose a username.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
      </Form.Row>
       <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}  controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                </Form.Control.Feedback>
            </Form.Group>
       
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone Number" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
        </Form.Row>

        <Button type="submit">Submit form</Button>
        <p>
            {userType}
        </p>
    </Form>
        <p>
            {userType}
        </p>
</>
    )
    
    
    
}

export default Register
