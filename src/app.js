const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const PORT = 3000;

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name: "Fabio Bannet"
    });
});

app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
       return res.send({
            error: 'You must provide an address!'
        })
    }else
    {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if(error)
            {
               return res.send({
                    error
                });
            }

            forecast(latitude, longitude, (error, forecastData) =>{
                if(error)
                {
                    return res.send({
                        error
                    });
                }
                res.send({
                    location,
                    forecast: forecastData
                });
            });
        });
    }
});

app.get('/about', (req, res) =>{
    res.render("about", {
        title:"About me",
        name: "Fabio Bannet"
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title:"Help page welcomes you newcomer!",
        name: "Fabio Bannet"
    })
});

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:"404",
        name:"Fabio Bannet",
        errorMessage:"Help article not found!"
    });
});

app.get('/products', (req, res) =>{
    if(!req.query.search){
        res.send(
            {
                error:'You must provide a search term'
            }
        )
    }else
    {
        res.send({
            products:[]
        })
    }    
});

app.get('*', (req, res) =>{
    res.render('404', {
        title:"404",
        name:"Fabio Bannet",
        errorMessage:"Page not found!"
    });
});

// start server
app.listen(PORT, () =>{
    console.log(`Server is up at address http://localhost:${PORT}`);
});