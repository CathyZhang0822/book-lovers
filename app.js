var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var flash = require('connect-flash');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

// mysql://b53c45e6d8dda1:34effbd9@us-cdbr-iron-east-01.cleardb.net/heroku_8174187062a364b?reconnect=true
var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'cathypangpang',  
//   database : 'join_us'         
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b53c45e6d8dda1',
    password : '34effbd9',
    database : 'heroku_8174187062a364b'
  
});

connection.connect();

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




// Comment Destroy Route
app.post("/users/:id", function(req,res){
   var id = req.params.id;
   connection.query('DELETE FROM users WHERE id = ?', [id], function(err, result){
      if (err) {
         res.redirect("/users");
      } else {
        flash("deleted");
        res.redirect("/users");
      }
   });
});

app.post('/register', function(req,res){
    var person = {name: req.body.name, email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
    console.log(err);
    console.log(result);
    flash("success", "You have been added!");
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


// User Edit Route
app.get("/books/:id/edit", function(req, res){
   var id = req.params.id;
   console.log(req.params.id);
   connection.query('SELECT * FROM books WHERE id = ?', [id], function(err, result){
      console.log(result);
      if (err) {
          flash(err);
          res.redirect("/books");
      } else {
          res.render("books/edit", {bookId: req.params.id, book: result[0]});
      }
   });
});

app.post("/books/:id", function(req, res){
  var id = req.params.id;
  var updatedBook = {
      title: req.body.title,
      author: req.body.author,
  };
  connection.query('UPDATE books set ? WHERE id = ?', [updatedBook, id], function(err, result){
      if (err) {
         res.redirec("/books");
      } else {
         req.flash("success", "Successfully updated book");
         res.redirect("/books");
      }
  });
});

app.get("/reviews", function(req, res) {
    var q = "SELECT title, AVG(rating) as avg_rating FROM books JOIN reviews on books.id = reviews.books_id GROUP BY books.id ORDER BY avg_rating";
    // connection.query(q, function(err, results){
    //     if(err) throw err;
    //     // render with book data, ordered by ratings
    //     res.render("reviews/index", {books: results});
    //     console.log(results);
    // });
    connection.query(q, function(err, results){
        if(err) throw err;
        var reviews = results;
        connection.query("SELECT * FROM users", function(err, results) {
             if(err) throw err;
             var users = results;
             connection.query("SELECT * FROM books", function(err, results) {
                 if(err) throw err;
                 var all_books = results;
                 res.render("reviews/index", {all_books:all_books, users:users, books: reviews});
                 //console.log(reviews);
                 //console.log(users);
                 console.log(reviews);
            });
        });
    });
});

app.post("/reviews/new", function(req, res){
   var newReview = {user_id: req.body.user_id, books_id: req.body.books_id, rating: req.body.rating};
   //var newReview = {rating: 6, books_id: 1, user_id: 5};
   console.log(newReview);
   connection.query('INSERT INTO reviews SET ?', newReview, function(err, result) {
       if(err) throw err;
       console.log(result);
       res.redirect("/reviews");
   });
});

app.listen(process.env.PORT || 8080, function () {
 console.log('App listening on port 8080!');
});

