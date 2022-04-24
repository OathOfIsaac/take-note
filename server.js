const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');


// const {
//     getNotes,
//     saveNote,
//     renderActiveNote,
//     handleNoteSave,
// } = require('./public/assets/js');

//middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 3001;


app.get('/notes', (req, res) => {
    let results = notes;
    res.sendFile(path.join(__dirname, './public/notes.html'));
   
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.sendFile(path.join(__dirname, './db/db.json'));
    
});

app.post( '/api/notes' , (req,res) => {


    fs.readFile('./db/db.json', (err , data ) => {
        var apiPost = req.body;
        let oldData = JSON.parse(data);
        oldData.push(apiPost);

        //add an id to an object
        apiPost.id= uuidv4();

    
        
        console.log(apiPost)
        fs.writeFile('./db/db.json' , JSON.stringify(oldData) , (err ) => {
            if (err) throw err;

            
            console.log('The file has been saved.')

            res.json(oldData)
            
            
        });
        
    });


});

app.get('*' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT , () => { 

    console.log('Hello world')
});