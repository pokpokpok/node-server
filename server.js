const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//middleware
app.set('view engine', 'hbs');
//dirname - path to project dir
app.use(express.static(__dirname + '/public'));
//for custom middleware next tells to go on after the middleware
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Unable to write to server.log.");
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render("maintenance.hbs");
//     //NO next(), so we will note move forward from maintenance screen
// });


//setup handlers for http requests
app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!</h1>');
    response.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Good luck, boy!"
    });

    // response.send({
    //     name: "Alex",
    //     likes: [
    //         "Guitars",
    //         "Women"
    //     ]
    // });
});

app.get('/about', (request, response) => {
    //response.send("About page");
    response.render("about.hbs", {
        pageTitle: "About Page"
    });
});

app.get('/projects', (request, response) => {
    //response.send("About page");
    response.render("projects.hbs", {
        pageTitle: "Projects"
    });
});

app.get('/bad', (request, response) => {
    response.send({errorMessage: "Unable to handle request!"});
});

//bind app to the port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});