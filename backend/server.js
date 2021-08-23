const express = require ( 'express');
const animals = require ( './cattleForSale.js');
const app = express();
const {sequelize} = require('./models')
const adminRoutes = require ( './Routes/admin');
const BlogRoutes = require('./Routes/Blogs');
const Discussion = require('./Routes/Discussion');
const Entities = require('./Routes/Entities')
const Ecommerce = require('./Routes/Ecommerce')

app.use('/admin',adminRoutes);  // this is called filtering paths
app.use('/api/blogs',BlogRoutes);
app.use('/api/questions',Discussion);
app.use('/api/ecommerce',Ecommerce);
app.use('/api/admin/',Entities);
// Ecommerce Portion 
// 1) Get Animals/animal info 
app.get('/', (req, res) => {
res.send("Api is active and running...")
})
app.get('/api/animals',(req,res)=> {
    res.json(animals);
})
app.get('/api/animalss/:id',(req,res)=> {
    const Id = parseInt(req.params.id);
    const animal =animals.find( animal => animal.id === Id)
    console.log("animal with id is fetched")
    res.json(animal);
})
app.listen(5000,async()=>{
    console.log("The app listening at 5000");
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});