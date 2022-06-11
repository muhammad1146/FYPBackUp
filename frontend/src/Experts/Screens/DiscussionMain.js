import React,{useEffect,useState} from 'react';
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
import DiscussionSearchForm from '../../Farmers/Components/Discussion/DiscussionSearchForm';
const DiscussionMain = ({user}) => 
{
    const DiscussionContainer = () =>
    {
        const [searchText, setSearchText] = useState('');
        const setText = (e) => {
            setSearchText(e);
        }
        return ( 
            <>
           {console.log('rendered from expert module')}
            <Container>
            <Row className='m-0 py-2' style={{borderBottom:"1px solid #ced4da"}} >
            <Col lg={5} >
                <DiscussionSearchForm  setText={setText}/>
            </Col>
            <Col lg={7}></Col>
        </Row> 
            <Switch> 
            <Route exact path='/discussion/tags' component={ ()=> (<Tags user={user} />)  } />
            <Route path='/discussion/tags/:id' component={ ()=>(<Questions />) }  />
            <Route exact  path='/discussion/experts/:username' component={()=><ExpertProfile user={user} />} />
                <Route path='/discussion/farmers' component={ Farmers } exact />
                <Route exact path='/discussion' component={()=>(<Questions search= {searchText}  /> )}   /> 
                <Route exact path='/discussion/my' component={ Questions  } />
                <Route exact path='/discussion/unanswered' component={ Questions  } />
                
                <Route exact path='/discussion/farmers/:fid' component={ FarmerProfile }  />
                <Route exact path='/discussion/experts' component={Experts} />
                
                 <Route exact path='/discussion/:qid' component={()=> (<Question user={user} />)}   /> {/*Done */}
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