import React, { useState } from 'react'

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        let data;
    if(url==='/discussion/questions')
    {
    data = axios.get('')
    }
    else if(url==='/discussion/questions/my'){
    data = axios.get('');
    }
    else if(url==='/discussion/questions/unanswered'){
        data = axios.get('');
    }
    setBlogs(data);
        return () => {
            cleanup
        }
    }, [])
    const BlogsContainer = ({blog}) => {
        return (
            //blog body
            //blog reacts
            //Expert Data
            //blogimage
    <>
    <Card styles={{padding:'2rem'}}>
        <Card.Title>Card Title</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
                Some quick example text to build on the card title and make up the bulk of
            the card's content.
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Card.Link href="#" className='text-muted'>Card Link</Card.Link>
            </Card.Body>
        </Card>
        <br />
        <Card>
            <Card.Body>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
            </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src="holder.js/100px180" />
    </Card>
    </>
        )
    }
    return (
        <Container>
            {
                blogs.map((blog =>{
                    return(
                        <BlogsContainer blog />
                    )
                }))
            }
        </Container>
    )
}

export default Blogs
