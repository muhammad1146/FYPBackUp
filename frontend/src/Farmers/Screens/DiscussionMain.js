import React,{useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../Components/DiscussionsSidebar'
const DiscussionMain = () => 
{
    const DiscussionContainer = () =>
    {
        return (
        <Container>
            <Switch> 
                <Route path='/' component={()=>(<div className='contentSection'>
                        <Row>
                        <InflateData />
                        </Row>
                </div>)} exact />
                <Route path='/questions' component={}   />
                <Route path='/questions/unanswered' component={}  />
                <Route path='/questions/top' component={}  />
                <Route path='/questions/tags' component={}  />
                <Route path='/questions/my' component={}  />
                <Route path='/tags' component={}  />
                <Route path='/questions/:qid' component={}   />
                <Route path='/farmers' component={}  />
                <Route path='/farmers/:fid' component={}  />
                <Route path='/experts' component={}  />
                <Route path='/experts/:eid' component={}  />
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
        <Sidebar />
        <DiscussionContainer />
        
        </>
    );

    

}



export default DiscussionMain;