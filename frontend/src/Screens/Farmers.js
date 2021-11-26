// This Screen is without the right side bar 
import React, { useEffect, useState } from 'react'
import '../../App.css'
const Farmers = () => {
    const [farmers,setFarmers] = useState([]);
    useEffect(()=> {
        const data = axios.get();
        setFarmers(data);
    },[]);
const FarmerContainer = (props) =>{
return(
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>FarmerName</Card.Title>
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
        <div className='contentSection'>
            <h1>Farmers</h1>
            {farmers.map((farmer) => {
                return (
                    <FarmerContainer farmer />
                )
            })}
        </div>
    )
}

export default Farmers
