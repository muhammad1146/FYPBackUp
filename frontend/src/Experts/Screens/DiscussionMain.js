import React,{useEffect} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../Components/DiscussionSidebar'
import Questions from '../../Farmers/Screens/Discussion/Questions';
import Question from '../../Farmers/Screens/Discussion/Question';
import Farmers from '../../Farmers/Screens/Farmers';
import FarmerProfile from '../../Farmers/Components/FarmerProfile';
import Experts from './Experts'
import ExpertProfile from '../Components/ExpertProfile';
import Tags from './Tags';
const DiscussionMain = () => 
{
    const DiscussionContainer = () =>
    {
        return ( 
            <>
           {console.log('rendered from expert module')}
            <Container>
          
            <Switch> 
            <Route path='/discussion/experts/:eid' component={ExpertProfile} exact/>
                <Route path='/discussion/farmers' component={ Farmers } exact />
                <Route exact path='/discussion' component={Questions }   /> {/*Done */}
                <Route exact path='/discussion/my' component={ Questions  }  />
                {/* <Route path='/discussion/:qid' component={ Question } /> */}
                <Route path='/discussion/farmers' component={ Farmers }  />
                <Route path='/discussion/farmers/:fid' component={ FarmerProfile }  />
                <Route path='/discussion/experts' component={Experts} />
                
                <Route path='/discussion/*' component={(
                    <>
                        <h4>Page Not Found</h4>
                    </>
                )} />
            </Switch>
        </Container>
        
        </>
        )
    }
    return (
        <Row>
        <Col xs={2} lg={2}>
            <Sidebar />
        </Col>
        <Col lg={10} style={{padding:"0"}} className="border border-secondary">
            <DiscussionContainer />   
        </Col>
        </Row>
    );
}

export default DiscussionMain;