const express = require('express');
const animals = require ('./data/cattleForSale')
const app = express()

app.get('/', (req, res) => {
    res.send('Backend API is running')
})
app.get('/api/animals',(req,res)=> {
    res.json(animals);
})
app.get('/api/animals/:id',(req,res)=> {
    const Id = parseInt(req.params.id);
    const animal =animals.find( animal => animal.id === Id)
    console.log("animal with id is fetched")
    res.json(animal);
})
app.listen(5000,console.log("server running on port 5000"));