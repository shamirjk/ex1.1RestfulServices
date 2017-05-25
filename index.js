'use strict';
const   express= require ('express'),
        app = express(),
        port = process.env.PORT || 3000,
        bodyParser = require('body-parser'),
        myList = require('./holidayMdl');

app.use(bodyParser.json()); //parsing application/JSON
app.use(bodyParser.urlencoded({extended: true})); //parsing application

//Index Page that shows the API
app.get(`/`, (req, res) => {
    res.status(200).sendFile(__dirname + "/API/api.html")
});

//return All the Movies in Library
app.get(`/getAllMovies`, (req, res) => {
    myList.getAllMovies().then((resData) =>
        res.status(200).json(resData)
    );
    console.log(`GET Method Request All Movies`);
});

//returns all Thr movies with Holiday tag
app.get(`/getHolidayMovies`, (req, res) => {
    myList.getHolidayMovies().then((resData) =>
        res.status(200).json(resData)
    );
    console.log(`GET Method Request Only Holiday Movies`)
});

//returns a movie with specific holiday and in specific Language
app.get(`/getMoviesByHolidayAndLanguage/:holiday_name/:language`, (req, res) => {
        myList.getMoviesByHolidayAndLanguage(req.params.holiday_name, req.params.language).then((resData) => {
            res.status(200).json(resData);
        });
    console.log(`GET Method request Movies By Holiday: ${req.params.holiday_name},
    And Language: ${req.params.language}`);
});

//POST method that returns all movies related to a specific holiday
app.post('/getMoviesByHoliday/', (req, res) => {
    console.log(`POST Movies By Holiday : ${req.body.holiday_name}`);
    myList.getMoviesByHoliday(req.body.holiday_name).then((data) => {
        if (data.length==0)
            res.json({"Error": "No Movie with Requested Holiday"});
        else res.status(200).json(data);
    });
});

//friendly 404 Page
app.all('*', (req, res) => {
    console.log(`Wrong Page address - friendly 404. Check the URL address`);
    res.status(404).send(`Got Lost? This is a friendly 404 Page`);
});

app.listen(port, () => {//create Server
    console.log(`listening on port ${port}`);
});

/**
 * Created by Shamir on 07-May-17.
 */