-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255),
--     name VARCHAR(100) NOT NULL DEFAULT 'anonymous',
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE books(
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(100),
--     author VARCHAR(100)
-- );

-- CREATE TABLE reviews (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     rating DECIMAL(2,1) DEFAULT 0,
--     books_id INT,
--     user_id INT,
--     FOREIGN KEY(books_id) 
--         REFERENCES books(id)
--         ON DELETE CASCADE
--         ON UPDATE CASCADE,
--     FOREIGN KEY(user_id) 
--         REFERENCES users(id)
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- );

-- INSERT INTO books (title, author)
-- VALUES
-- ('The Namesake', 'Jhumpa Lahiri'),
-- ('Norse Mythology', 'Neil Gaiman'),
-- ('American Gods', 'Neil Gaiman'),
-- ('Interpreter of Maladies', 'Jhumpa Lahiri'),
-- ('A Hologram for the King: A Novel', 'Dave Eggers'),
-- ('The Circle', 'Dave Eggers'),
-- ('The Amazing Adventures of Kavalier & Clay', 'MichaelCha bon'),
-- ('Just Kids', 'Patt Smith');

SELECT 
    books.id,
    title, 
    AVG(rating) as avg_rating
FROM books
JOIN reviews
    on books.id = reviews.books_id
GROUP BY books.id
ORDER BY avg_rating;