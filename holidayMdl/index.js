'use strict';
const   data = require (`../models/movies`),
        consts = require (`../consts`),
        mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY);

var conn = mongoose.connection;

conn.on(`error`, (err) => {
    console.log(`connection error: ${err}`);
});

conn.once(`open`, (err) => {
    if (err) console.log(`query.error${err}`);
    console.log(`Connected`);
    //mongoose.disconnect();
});

exports.getAllMovies = () => {
    return data.find({})
};

exports.getHolidayMovies = () => {
    return data.find({holiday: {$exists: true}},
        (err) => {
            if (err) console.log(`query.error${err}`);
        });
};

exports.getMoviesByHoliday = (holiday_name) => {  //POST
    return data.find({holiday: holiday_name}, (err, list) => {
        if (err) console.log(`query.error${err}`);
        if (list.length < 1) {
            return {"Error": "No Matching Movies"};
        }
    });
};

exports.getMoviesByHolidayAndLanguage = (holiday_name, lang) => {
    return data.find({holiday: holiday_name, "language.original": lang},
        (err) => {
            if (err) console.log(`query.error${err}`);
        });
};