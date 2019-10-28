var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/", function(err)
{if (err) throw err;
console.log("database connected");
});

// mLab data base 

mongoose.connect("mongodb://git.heroku.com/jenny-news-scraper.git  ", function(err)
{ if (err) throw err;
    console.log("database connected");
});
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);