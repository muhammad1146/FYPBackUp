import React,{useEffect,useContext} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../Components/EcommerceSidebar'
import { UserContext } from '../../Contexts/UserContext';
import Tag from '../Components/Tag';
const EcommerceMain = () => 
{
const {user,userType} = useContext(UserContext);
const EcommerceContainer = () =>
{
        if(user.uuid!= null)
        {
        
        } 
        return (
        <Container>
            <Switch> 
                {/* <Route path='/' component={()=>(<div className='contentSection'>
                        <Row>
                        <InflateData />
                        </Row>
                </div>)} exact /> */}
                {/* <Route path='/posts' component={}   />
                <Route path='/posts/top' component={}  />
                <Route path='/posts/tags' component={<Tag />}  />
                <Route path='/tags' component={}  />
                <Route path='/posts/my' component={} />
                <Route path='/posts/my/:mpid' component={} />
                <Route path='/posts/:pid' component={}   />
                <Route path='/posts/:pid/order' component={} />
                <Route path='/farmers' component={}  /> 
                <Route path='/farmers/:fid' component={}  /> */}
            </Switch>
        </Container>
        )
    }
//1) Sidebar
// i)
// ii)
// iii)
//2) Container
    return (
        <Row>
            <Col lg={2}>
            <Sidebar />
            </Col>
            <Col lg={10}>
            <EcommerceContainer />   

            </Col>
        </Row>
    );
}

export default EcommerceMain;