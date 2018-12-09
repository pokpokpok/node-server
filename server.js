const express = require('express');

var app = express();

//middleware
//dirname - path to project dir
app.use(express.static(__dirname + '/public'));

//setup handlers for http requests
app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!</h1>');
    response.send({
        name: "Alex",
        likes: [
            "Guitars",
            "Women"
        ]
    });
});

app.get('/about', (request, response) => {
    response.send("About page");
});

app.get('/bad', (request, response) => {
    response.send({errorMessage: "Unable to handle request!"});
});

//bind app to the port
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});