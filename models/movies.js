var mongoose = require(`mongoose`),
    schema = mongoose.Schema,

    Language = new schema({
        original: String,
        subtitles: String
    }),

    movieSchema = new schema({
        name:{type:String, index:1, required:true},
        year: Number,
        genre: String,
        starring: [String],
        running_time: String,
        country: String,
        language: Language,
        tags: [String]
        },{collection:`movies`}
    );

//module.exports = mongoose.model('movie', schema);
let Movie = mongoose.model(`Movie`, movieSchema); //Creating a model Object and Connect to Schema
module.exports=Movie; //exports thr model