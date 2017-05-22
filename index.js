'use strict';
const   express= require ('express'),
        app = express(),
        port = process.env.PORT || 3000,
        bodyParser = require('body-parser'),
        myList = require('./holidayMdl');

app.use(bodyParser.json()); //parsing application/JSON
app.use(bodyParser.urlencoded({extended: true})); //parsing application

app.all('*', (req, res, next) => {
    console.log("runs for all HTTP verbs first");
    res.status(200);
    next();
});

app.get(`/getAllMovies`, (req, res) => {
    myList.getAllMovies().then((resData) =>
        res.status(200).json(resData)
    );
    console.log(`get All Movies: ${req.params}`);
});

app.get(`/getHolidayMovies`, (req, res) => {
    myList.getHolidayMovies().then((resData) =>
        res.status(200).json(resData)
    );
    console.log(`get Holiday Movies: ${req.params}`)
});

app.get(`/getMoviesByHolidayAndLanguage/:holiday_name/:language`, (req, res) => {
    myList.getMoviesByHolidayAndLanguage(req.params.holiday_name, req.params.language).then((resData) =>
        res.status(200).json(resData)
    );
    console.log(`get Movies By Holiday And Language: ${req.params}`);
});

app.post('/getMoviesByHoliday/', (req, res) => {
    console.log(`POST Movies By Holiday : ${req.params}`);
    myList.getMoviesByHoliday(req.body.holiday_name).then((data) => {
        res.status(200).json(data);
    });
});

app.get(`/`, (req, res) => {
    res.status(200).sendFile(__dirname + "/API/api.html")
});

app.listen(port, () => {//create Server
    console.log(`listening on port ${port}`);
});

/**
 * Created by Shamir on 07-May-17.
 */