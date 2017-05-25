'use strict';
const   data = require(`../models/movies`),
        consts = require(`../consts`),
        mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);

var conn = mongoose.connection; //get default connection

conn.on(`error`, (err) => {
    console.log(`connection error: ${err}`);
});

conn.once(`open`, (err) => {
    if (err) console.log(`query.error${err}`);
    console.log(`Connected`);
    //mongoose.disconnect();
});

//return all movies in library
exports.getAllMovies = () => {
    return data.find({},'-_id')
};

//return only the Movies that have a Holiday tag in it
exports.getHolidayMovies = () => {
    return data.find({holiday: {$exists: true}}, '-_id',
        (err) => {
            if (err) console.log(`query.error${err}`);
        });
};

//POST method that returns only the movies with specific holiday
exports.getMoviesByHoliday = (holiday_name) => {  //POST
    return data.find({holiday: holiday_name}, '-_id', (err) => {
        if (err) console.log(`query.error${err}`);
    });
};

//return all movies of specific holiday and original Language
exports.getMoviesByHolidayAndLanguage = (holiday_name, lang) => {
    let myPromise = new Promise((result) => {
        data.find({holiday: holiday_name, "language.original": lang},'-_id',
            (err, data) => {
                if (err) {
                    console.log(`query.error${err}`);
                }
                if (data[0] === undefined) {
                    result({"Error": "Couldn't find Movie with Requested Parameters"});
                } else {
                    result(data);
                }
            });
    });
    return myPromise;
};