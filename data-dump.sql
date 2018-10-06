-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: join_us
-- ------------------------------------------------------
-- Server version	5.5.57-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'The Namesake','Jhumpa Lahiri'),(2,'Norse Mythology','Neil Gaiman'),(3,'American Gods','Neil Gaiman'),(4,'Interpreter of Maladies','Jhumpa Lahiri'),(5,'A Hologram for the King: A Novel','Dave Eggers'),(6,'The Circle','Dave Eggers'),(7,'The Amazing Adventures of Kavalier & Clay','MichaelCha bon'),(8,'Just Kids','Patt Smith'),(9,'Harry Potter','J.K '),(10,'Harry Potter','J.K KK');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` decimal(2,1) DEFAULT NULL,
  `books_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_id` (`books_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,8.0,6,1),(2,4.0,4,2),(3,7.0,3,3),(4,7.0,6,4),(5,4.0,2,5),(6,4.0,8,6),(7,7.0,7,7),(8,7.0,4,8),(9,9.9,4,9),(10,9.9,8,10),(11,7.0,3,1),(12,4.0,7,2),(13,8.0,8,3),(14,4.0,3,4),(15,3.0,8,5),(16,5.0,8,6),(17,6.0,7,7),(18,1.0,7,8),(19,1.0,8,9),(20,2.0,4,10),(21,4.0,7,1),(22,2.0,3,2),(23,6.0,1,3),(24,3.0,8,4),(25,3.0,4,5),(26,7.0,8,6),(27,2.0,3,7),(28,4.0,5,8),(29,5.0,7,9),(30,3.0,1,10);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'anonymous',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Brionna39@gmail.com','Clementina Armstrong','2018-03-24 04:33:04'),(2,'Zackary52@hotmail.com','Ms. Wilber Rutherford','2018-06-26 10:10:13'),(3,'Raegan_Mertz@gmail.com','Jace Streich','2018-01-13 00:40:04'),(4,'Retha41@yahoo.com','Miss Stevie Wisozk','2018-07-31 06:36:15'),(5,'Coby.Tremblay47@yahoo.com','Leopoldo Stamm V','2017-11-17 20:28:58'),(6,'Bartholome.Kemmer82@gmail.com','Laury Fahey V','2018-03-18 12:37:26'),(7,'Frieda_Ortiz@yahoo.com','Ms. Tanner Stroman','2018-02-07 06:35:46'),(8,'Sylvester_Wilkinson@gmail.com','Domingo Fahey','2017-12-28 14:21:16'),(9,'Marina.Herman@gmail.com','Ms. Bradley Bins','2018-05-01 11:56:58'),(10,'Jonathan43@hotmail.com','Ms. Davin Flatley','2018-07-15 18:07:44'),(11,'zhangyuelinchina@gmail.com','zhangyuelin','2018-10-05 21:19:40'),(12,'zyl@tamu.edu','cathy','2018-10-05 22:01:24'),(13,'d','cathy','2018-10-05 22:13:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-06 22:46:30
