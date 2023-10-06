// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8000;

// set the server to listen at PORT 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//middleware
app.use(express.static('public'));

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.send("./index.html");
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request query string
    const {owner} = req.query.owner;
    // console.log owner
    console.log(`pets owner, ${owner}`)

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.send(pet)
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request params
    const { name } = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(pet);
});



module.exports = app;