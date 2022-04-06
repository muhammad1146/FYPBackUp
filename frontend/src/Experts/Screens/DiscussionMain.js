import React,{useEffect} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../Components/DiscussionSidebar'
import Questions from '../../Farmers/Screens/Discussion/Questions';
import Question from '../../Farmers/Screens/Discussion/Question';
import Farmers from '../../Farmers/Screens/Farmers';
import FarmerProfile from '../../Farmers/Components/FarmerProfile';
import Experts from './Experts'
import Expert from './Expert';
const DiscussionMain = () => 
{
    const DiscussionContainer = () =>
    {

        return ( 
            <>
        {console.log('rendered from expert module')}
            <Container>
            <h3>Experts Container </h3>
            <Switch> 
                <Route path='/' component={ Questions } exact />
                <Route exact path='/questions' component={Questions }   /> {/*Done */}
                {/* <Route path='/questions/unanswered' component={<Questions />}  /> */}
                <Route exact path='/questions/my' component={ Questions  }  />
                {/* <Route path='/questions/tags/' component={ }  /> */}
                {/* <Route path='/tags' component={<Tag />}  /> */}
                <Route path='/questions/:qid' component={ Question }  />
                <Route path='/farmers' component={ Farmers }  />
                <Route path='/farmers/:fid' component={ FarmerProfile }  />
                <Route path='/experts' component={ Experts }  />
                <Route path='/experts/:eid' component={ Expert }  />
            </Switch>
        </Container>
        
        </>
        )
    }
//1) Sidebar
// i)
// ii)
// iii)
//2) Container
    return (
        <Row>
        <Col xs={2} lg={2}>
            <Sidebar />
        </Col>
        <Col lg={10}>
            <DiscussionContainer />   
        </Col>
        </Row>
    );
}

export default DiscussionMain;