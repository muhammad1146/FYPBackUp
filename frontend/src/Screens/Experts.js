import React from 'react'

const Experts = () => {

    const [experts,setExperts] = useState([]);
    useEffect(()=> {
        const data = axios.get();
        setExperts(data);
    },[]); 
    const ExpertsContainer = (props) =>{
        return(
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>ExpertName</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Farming</Card.Subtitle>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                    </Card>
        )
        }
    return (
        <div>
            <h1>Experts</h1>
            {experts.map((expert) => {
                return (
                    <ExpertsContainer expert />
                )
            })}
        </div>
    )
}

export default Experts
