import React,{useEffect,useState} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import DiscussionSidebar from '../../Components/Discussion/DiscussionsSidebar';
import { Link } from 'react-router-dom';
import Tag from '../../Components/Discussion/Tag';
import Question from './Question';
import Questions from './Questions';
import Farmers from '../Farmers'
import Experts from '../../../Experts/Screens/Experts';
import FarmerProfile from '../../Components/FarmerProfile';
import ExpertProfile from '../../../Experts/Components/ExpertProfile';
import DiscussionSearchForm from '../../Components/Discussion/DiscussionSearchForm';
import AddQuestion from './AddQuestion';
import Tags from '../../../Experts/Screens/Tags';
import MyQuestions from './MyQuestions';
import Page404 from '../../../components/Page404';

const DiscussionMain = ({user}) => 
{
    const DiscussionContainer = () =>
    {
        const [searchText, setSearchText] = useState('');
        const setText = (e) => {
            setSearchText(e);
        }
        return (
        <Container className='w-100  p-0'>
        <Row className='m-0 py-2' style={{borderBottom:"1px solid #ced4da"}} >
            <Col lg={5} >
                <DiscussionSearchForm  setText={setText}/>
            </Col>
            <Col lg={5}></Col>
            <Col lg={2}>
            <Link to={'/discussion/add-question'}>
                <Button style={{borderRadius:'25px'}}>Add Question </Button>
            </Link>
            </Col>
        </Row>         
            <Switch> 

            <Route path='/discussion/experts/:username' component={()=>(<ExpertProfile user={user} />) }/>

                 <Route exact path='/discussion' component={()=><Questions user={user} search={searchText}/>} /> 
                <Route exact path='/discussion/my' component={()=> (<MyQuestions search={searchText} />) }  />

                 <Route path='/discussion/add-question' component={AddQuestion} exact />
                {/* <Route exact path='/questions' component={Questions } />  */}
                <Route path='/discussion/tags' component={ ()=>(<Tags user={user} search={searchText}/>) }  exact/>
                <Route path='/discussion/tags/:id' component={ ()=>(<Questions />) }  />
                <Route path='/discussion/farmers' component={()=>(<Farmers />)} exact />
                
                <Route path='/discussion/experts' component={()=> (<Experts search={searchText}/>) }  exact />

                <Route path='/discussion/farmers/:username' component={()=>(<FarmerProfile user={user} />) }/>

                <Route path='/discussion/:qid' component={()=>(<Question user={user}/> )}  />

                {/* <Route path='/*' component={()=>(<Page404/> )}  /> */}

            </Switch>
        </Container>
        )
    }

    return (
        <>
        <Row className='m-0'>
        <Col xs={2} lg={2} className='bg-secondary mh-100'>
        <DiscussionSidebar /> 
        </Col>
        <Col xs={10} lg={10} className="border border-secondary p-0" >
        <DiscussionContainer />
        </Col>
        </Row>
        
        </>
    );

    

}



export default DiscussionMain;