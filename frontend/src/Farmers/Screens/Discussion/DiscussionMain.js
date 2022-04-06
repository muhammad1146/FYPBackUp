import React,{useEffect} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../../Components/Discussion/DiscussionsSidebar'
import Tag from '../../Components/Discussion/Tag';
import Question from './Question';
import Questions from './Questions';
import Farmers from '../Farmers'
import Experts from '../../../Experts/Screens/Experts';
import FarmerProfile from '../../Components/FarmerProfile';
import ExpertProfile from '../../../Experts/Components/ExpertProfile';
import DiscussionSearchForm from '../../Components/Discussion/DiscussionSearchForm';

const DiscussionMain = () => 
{
    console.log('DiscussionMain Reached....')
    const DiscussionContainer = () =>
    {
        return (
        <Container className='w-100 border'>
        <DiscussionSearchForm />
        <Button>Add Question </Button>
         
            <Switch> 
                 <Route path='/' component={Questions} exact /> 
                <Route exact path='/questions' component={Questions }   /> {/*Done */}
                {/* <Route path='/questions/unanswered' component={<Questions />}  /> */}
                <Route exact path='/questions/my' component={ Questions  }  />
                {/* <Route path='/questions/tags/' component={ }  /> */}
                <Route path='/tags' component={ Tag }  />
                <Route path='/questions/:qid' component={Question }  />
                <Route path='/farmers' component={ Farmers }  />
                <Route path='/farmers/:fid' component={ FarmerProfile }  />
                <Route path='/experts' component={ Experts }  />
                <Route path='/experts/:eid' component={ ExpertProfile }  />
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
        <>
        <Row>
        <Col xs={2} lg={2} className='bg-secondary mh-100'>
        <Sidebar /> 
        </Col>
        <Col xs={10} lg={10} >
        <DiscussionContainer />
        </Col>
        </Row>
        
        </>
    );

    

}



export default DiscussionMain;