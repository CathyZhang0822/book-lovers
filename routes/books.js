var express = require('express');
var mysql = require('mysql');
var router = express.Router({mergeParams: true});
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'cathypangpang',  //your username
  database : 'join_us'         //the name of your db
});


router.get("/books", function(req, res){
    var q = "SELECT * FROM books as books";
    connection.query(q, function(err, results){
        if(err) throw err;
        // render with data
        res.render("books/index", {books: results});
        console.log(results);
    });
});
