import React,{useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../Components/BlogSidebar'
const EcommerceMain = () => 
{
    const EcommerceContainer = () =>
    {
        return (
        <Container>
            <Switch> 
                <Route path='/' component={()=>(<div className='contentSection'>
                        <Row>
                        <InflateData />
                        </Row>
                </div>)} exact />
                <Route path='/posts' component={}   />
                <Route path='/posts/top' component={}  />
                <Route path='/posts/tags' component={}  />
                <Route path='/tags' component={}  />
                <Route path='/posts/:pid' component={}   />
                <Route path='/posts/:pid/order' component={} />
                <Route path='/posts/myposts' component={} />
                <Route path='/posts/myposts/:mpid' component={} />
                <Route path='/farmers' component={}  />
                <Route path='/farmers/:fid' component={}  />
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
            <EcommerceContainer />   
        </>
    );
}

export default EcommerceMain;