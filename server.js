var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'cathypangpang',  //your username
  database : 'join_us'         //the name of your db
});


// RESTFUL ROUTES
app.get("/", function(req, res){
    var q = "SELECT COUNT(*) As count FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;
        var msg = "We have " + results[0].count + " users";
        res.render("home", {count: results[0].count});
        console.log(results[0].count);
    });
});

// INDEX PAGE: SHOW ALL USERS
app.get("/users", function(req, res){
    var q = "SELECT * FROM users as users";
    connection.query(q, function(err, results){
        if(err) throw err;
        // render with data
        res.render("index", {users: results});
        console.log(results);
    });
    
});

// SHOW PAGE: SHOW SINGLE USER
app.get("/users/:id", function(req, res){
    var id = req.params.id;
    console.log(req.params.id);
    //var q = "SELECT * FROM users WHERE id = %s"
    var q = " SELECT title, AVG(rating) FROM books JOIN reviews on reviews.user_id = %s GROUP BY title"
    console.log(q.replace('%s', id));
    connection.query(q.replace('%s', id), function(err, results){
        if(err) throw err;
        res.render("show", {user : results})
    });
})


app.post('/register', function(req,res){
    var person = {name: req.body.name, email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
    });
});


app.get("/books", function(req, res){
    var q = "SELECT * FROM books as books";
    //var q = "SELECT title, AVG(rating) as avg_rating FROM books JOIN reviews on books.id = reviews.books_id GROUP BY books.id ORDER BY avg_rating"
    connection.query(q, function(err, results){
        if(err) throw err;
        // render with data
        res.render("books/index", {books: results});
        console.log(results);
    });
});

app.post("/books/new", function(req, res){
   var newBook = {title: req.body.title, author: req.body.author};
   connection.query('INSERT INTO books SET ?', newBook, function(err, result) {
       if(err) throw err;
       console.log(result);
       res.redirect("/books");
   });
});

app.get("/reviews", function(req, res) {
    var q = "SELECT title, AVG(rating) as avg_rating FROM books JOIN reviews on books.id = reviews.books_id GROUP BY books.id ORDER BY avg_rating";
    connection.query(q, function(err, results){
        if(err) throw err;
        // render with book data, ordered by ratings
        res.render("reviews/index", {books: results});
        console.log(results);
    });
})

app.listen(8080, function () {
 console.log('App listening on port 8080!');
});