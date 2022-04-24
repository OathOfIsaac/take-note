const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

//middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 3001;


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
    let results = notes;
});

app.post( '/api/notes' , (req,res) => {


    fs.readFile('./db/db.json', (err , data ) => {
        var apiPost = req.body;
        let userInput = JSON.parse(data);
        userInput.push(apiPost);
    
        
        console.log(apiPost)
        fs.writeFile('./db/db.json' , (err ) => {
            // apiPost()
            
        })
    });


});

app.get('*' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT , () => { 

    console.log('Hello world')
});