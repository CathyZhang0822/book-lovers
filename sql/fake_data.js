// Root User: cathypangpang
var faker = require('faker');
var mysql = require('mysql');
 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'cathypangpang',  //your username
  database : 'join_us'         //the name of your db
});


// var data = [];
// for(var i = 0; i < 1000; i++){
//     data.push([
//         faker.internet.email(),
//         faker.name.findName(),
//         faker.date.past()
//     ]);
// }

// var q = 'INSERT INTO users (email, name, created_at) VALUES ?';
 
// connection.query(q, [data], function(err, result) {
//   console.log(err);
//   console.log(result);
// });

// var bookdata = [];
// for(var i = 0; i < 100; i++){
//     bookdata.push([
//         faker.name.title(),
//         faker.name.findName()
//     ]);
// }

// var q = 'INSERT INTO books (title, author) VALUES ?';
 
// connection.query(q, [bookdata], function(err, result) {
//   console.log(err);
//   console.log(result);
// });
// connection.end();


var q = "SELECT COUNT(*) As count FROM users";
var reviewsData = []; 

connection.query(q, function(err, results){
        if(err) throw err;
        console.log(results[0].count);
        global.userCount = results[0].count;
        for(var i = 0; i < global.userCount; i++){
          reviewsData.push([
            Math.floor((Math.random() * 10) + 1),
            Math.floor(Math.random() * (8)) + 1,
            i + 1
            ]);
        }
        connection.query('INSERT INTO reviews (rating, books_id, user_id) VALUES ?', [reviewsData], function(err, result) {
          console.log(err);
          console.log(result);
          
        });
        connection.end();
    });