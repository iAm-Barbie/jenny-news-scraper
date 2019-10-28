var express = require ("express");
var path = require("path");
var request = require ("request");
var cheerio = require ("cheerio");
var router = express.router();
var mongoose = require ("mongoose");
var expressHandlebars = require ("express-handlebars");
var Promise = require ("bluebird");
var axios = require ("axios");

mongoose.Promise = Promise;

var Articles =require ("../models/articles");
var Comments = require ("../models/comments");

var url = "https://www.nytimes.com/";

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/scrape", function(req, res) {
    request(url, function(err, response, html) {
        var $ = cheerio.load(html);
        var result =[];
        $(".span6").each(function(i, element){
            var title = $(element).find("a").find("img").attr("title");
            var storyLink = $(element).find("a").attr("href");
            var imgLink = $(element).find("a").find("img").attr("src");
            var summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            result.push({
                Title: title,
                Story: storyLink,
                Limk: imgLink,
                Summary: summary
            });
        });
        console.log(result);
        res.send(result);
    });
});

Articles.findOne({"title": title}, function(err, articleRecord){
    if(err) {
        console.log(err);
    } else {
        if(articleRecord == null) {
            Articles.create(result[i], function(err, record) {
                if(err) throw err;
                console.log("record added");
            });
        } else {
            console.log("No record added");
        }
    }
});

router.get("/articles", function(req, res) {
    Articles.find().sort({ createdAt: -1}).exec(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

router.get("/comments/:id", function(req, res){
    Comments.find({ "articleId": req.params.id}).exec(function(err, data){
        if(err){
            console.log(err);
        } else{
            res.json(data);
        }
    });
});

router.post("/addcomment/:id", function(req, res){
    console.log(req.params.id+' '+req.body.comment);
    Comments.create({
        articleId: req.params.id,
        name: req.body.name, comment: req.body.comment
    }, function(err, docs){
        if(err){
            console.log(err);
        } else{
            console.log("new comment added");
        }
    });
});

router.get("/deletecomment/:id", function(req, res){
    console.log(req.params.id)
    Comments.remove({"_id": req.params.id}).exec(function(err, data){
        if (err){
            console.log(err);
        } else {
            console.log("comment deleted");
        }
    });
});

module.exports = router;


