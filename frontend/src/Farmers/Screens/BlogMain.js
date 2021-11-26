import React,{useEffect} from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch,withRouter} from 'react-router-dom'
import Sidebar from '../Components/BlogSidebar'

const BlogMain = () => 
{

    const BlogContainer = () =>
    {
        return (

        <Container>
            <Switch> 

                {/* <Route path='/' component={()=>(<div className='contentSection'>
                        <Row>
                        <InflateData />
                        </Row>
                </div>)} exact /> */}
                {/* <Route path='/blogs' component={}   />
                <Route path='/blogs/top' component={}  />
                <Route path='/blogs/tags' component={}  />
                <Route path='/tags' component={}  />
                <Route path='/blogs/:qid' component={}   />
                <Route path='/farmers' component={}  />
                <Route path='/farmers/:fid' component={}  />
                <Route path='/experts' component={}  />
                <Route path='/experts/:eid' component={}  /> */}
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
            <BlogContainer />   
            </Col>
        </Row>
    );
}

export default BlogMain;