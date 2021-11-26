const express = require ( 'express');
const app = express();
const {sequelize} = require('./models')
const BlogRoutes = require('./Routes/Blogs'); //  Finished
const Discussion = require('./Routes/Discussion'); // Finished
const FarmerRoutes = require('./Routes/Farmer'); // Finished
const ExpertRoutes = require('./Routes/Expert'); // Finished
const AdminRoutes = require('./Routes/Entities'); //  Finished
const Ecommerce = require('./Routes/Ecommerce'); // Finished
app.use(express.json());
// this is called filtering paths
app.use('/api/blogs',BlogRoutes);
app.use('/api/questions',Discussion);
app.use('/api/ecommerce',Ecommerce);
app.use('/api/admin',AdminRoutes); 
app.use('/api/farmers',FarmerRoutes);
app.use('/api/experts',ExpertRoutes);

app.get('/', (req, res) => {
res.send(" CattleTalk Api is active and running...")
})
// app.get('/api/animals',(req,res)=> {
//     res.json(animals);
// })
// app.get('/api/animalss/:id',(req,res)=> {
//     const Id = parseInt(req.params.id);
//     const animal =animals.find( animal => animal.id === Id)
//     console.log("animal with id is fetched")
//     res.json(animal);
// })
app.listen(5000,async()=>{
    console.log("The app listening at 5000");
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});