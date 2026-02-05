-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hirehub_db
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20260202153504_AddReferralStatusAndUniqueIndex','9.0.0');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `job_id` bigint NOT NULL,
  `candidate_id` bigint NOT NULL,
  `status` enum('APPLIED','SHORTLISTED','SELECTED','REJECTED') DEFAULT NULL,
  `applied_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_app_job` (`job_id`),
  KEY `FK_app_candidate` (`candidate_id`),
  CONSTRAINT `FK_app_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`),
  CONSTRAINT `FK_app_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,1,1,'SHORTLISTED','2026-01-30 20:50:53.417812'),(2,2,2,'APPLIED','2026-01-30 21:44:31.288134'),(3,5,1,'APPLIED','2026-01-31 15:09:47.739049'),(4,7,1,'APPLIED','2026-01-31 16:32:07.198889'),(5,2,1,'SHORTLISTED','2026-01-31 16:41:12.016309'),(6,7,3,'APPLIED','2026-02-01 16:51:13.442761'),(7,6,1,'APPLIED','2026-02-02 12:14:00.036251'),(8,1,4,'SHORTLISTED','2026-02-02 15:14:35.971063'),(9,2,4,'APPLIED','2026-02-02 17:12:48.338982'),(10,1,6,'APPLIED','2026-02-03 14:50:29.374557'),(11,8,6,'APPLIED','2026-02-04 13:28:14.287022'),(12,7,6,'APPLIED','2026-02-04 13:28:17.023016'),(13,6,6,'APPLIED','2026-02-04 13:28:20.918084'),(14,5,6,'APPLIED','2026-02-04 13:28:24.474820'),(15,4,6,'APPLIED','2026-02-04 13:28:27.871343'),(16,2,6,'APPLIED','2026-02-04 13:28:31.698498'),(17,8,7,'APPLIED','2026-02-04 13:50:29.435931'),(18,7,7,'APPLIED','2026-02-04 13:50:34.436662'),(19,6,7,'APPLIED','2026-02-04 13:50:39.376457'),(20,5,7,'APPLIED','2026-02-04 13:50:44.893298'),(21,4,7,'APPLIED','2026-02-04 13:50:48.922589'),(22,2,7,'APPLIED','2026-02-04 13:50:52.952823'),(23,1,7,'APPLIED','2026-02-04 13:50:56.938601'),(24,1,8,'APPLIED','2026-02-04 17:20:39.339055'),(25,4,8,'APPLIED','2026-02-04 17:20:44.703211'),(26,9,6,'APPLIED','2026-02-04 17:56:46.968130'),(27,1,9,'APPLIED','2026-02-04 18:15:15.694102');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_info`
--

DROP TABLE IF EXISTS `candidate_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `candidate_id` bigint NOT NULL,
  `skills` text,
  `certifications` text,
  `github_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `achievements` text,
  `resume_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidate_id` (`candidate_id`),
  CONSTRAINT `fk_candidate_info_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_info`
--

LOCK TABLES `candidate_info` WRITE;
/*!40000 ALTER TABLE `candidate_info` DISABLE KEYS */;
INSERT INTO `candidate_info` VALUES (1,1,'React , MySQL , Springboot','AWS , IBM , Microsoft','https://github.com/','https://www.linkedin.com/in/ojaspatil17','Hackathons\r\n','/uploads/resumes/b4c24472-fb7d-4a67-8fb9-24b739c7945e_Ojas.pdf'),(2,3,NULL,NULL,NULL,NULL,NULL,NULL),(3,4,'SpringBoot,corejava,MYSQL.','CDAC','github','linkedurl','No achievment','/uploads/resumes/b8474d7d-1b02-4940-aec1-8cd8b4bcf150_egle2.jpeg'),(4,5,NULL,NULL,NULL,NULL,NULL,NULL),(5,6,'React , MySql , SpringBoot , Angular , MongoDB ','Full Stack Developer , AI Design ','test.user@example.com','Samir Tadvi','Hackthons , Leetcode , Coding Puzzles.','/uploads/resumes/896570f0-c2fb-4c6e-8725-800a6fcbc52e_batman1.jpg'),(6,7,'Node.Js , MySql ','Full Stack Developer','kalpesh@git.com','Kalpesh Chopde','Leetcode','/uploads/resumes/00a51f4b-41e5-415d-8125-02d2d2e44ba6_istockphoto-814423752-612x612.jpg'),(7,8,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `candidate_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `skills` text,
  `experience` double DEFAULT '0',
  `resume_url` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_candidate_user` (`user_id`),
  CONSTRAINT `FK_candidate_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,2,'Ojas','Java',2,NULL,NULL),(2,6,'Sujay','React MySQL',0,NULL,NULL),(3,11,'Jay','Java',0,NULL,NULL),(4,14,'shubham','java',4,NULL,NULL),(5,16,'L&T','We are seeking a talented Java developer with expertise in JavaScript, Vue.js, React, Spring Boot, Java, and MySQL to join our team at EduplusCampus. As a key member of our dynamic development team, you will have the opportunity to work on cutting-edge projects and contribute to the success of our innovative software solutions.',3,NULL,NULL),(6,17,'samir tadvi','MySql',2,NULL,NULL),(7,19,'Kalpesh Chopde','Angulare , SpringBoot , Node.Js',1,NULL,NULL),(8,20,'Tarun','Java , SpringBoot',2,NULL,NULL),(9,21,'Amit Patil','React , MySql , SpringBoot',2,NULL,NULL);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('PENDING','APPROVED','BLOCKED') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_company_user` (`user_id`),
  CONSTRAINT `FK_company_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,3,'TCS','APPROVED'),(2,5,'Meta','APPROVED'),(3,8,'Knowit','APPROVED'),(4,9,'Jio','APPROVED'),(5,13,'Citi Bank','APPROVED');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `company_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_employee_user` (`user_id`),
  KEY `FK_employee_company` (`company_id`),
  CONSTRAINT `FK_employee_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `FK_employee_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,4,1,'Vaibhav'),(2,7,2,'Goraksh'),(3,10,1,'Omkar'),(4,12,3,'Ram'),(5,15,1,'neeraj'),(6,18,1,'Shripad Jadhav');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `required_skills` text,
  `status` enum('OPEN','CLOSED') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_job_company` (`company_id`),
  CONSTRAINT `FK_job_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,1,'Junior Software Developer','We are seeking a motivated Junior Software Developer in Pune to build web applications using Node.js, React, and MySQL. You\'ll assist in developing features, debugging code, and collaborating on full-stack projects in a dynamic team environment. Ideal for recent IT graduates with hands-on experience.','JavaScript, Node.js, React, MySQL, Java, HTML/CSS, Git, problem-solving','OPEN',NULL),(2,1,'Junior Web Developer','\nJoin our Pune team to build responsive websites using React and Node.js. Assist in frontend-backend integration and testing features for client projects. Perfect for IT freshers eager to learn full-stack development.','React, Node.js, HTML/CSS, JavaScript, Git, API integration','OPEN',NULL),(4,2,'Frontend Developer Trainee','Create interactive UIs with React and CSS in a Pune startup. Work on component libraries and responsive designs for web apps. Suited for students practicing HTML/CSS/JS frontend skills.','React, JavaScript, CSS, HTML, Bootstrap, responsive design','OPEN',NULL),(5,2,'Database Analyst Intern','Support data querying and optimization using SQL in Pune-based projects. Help design schemas and analyze reports for business apps. Ideal for MySQL exam preppers with query-writing experience.','SQL, MySQL, database design, queries, data analysis, ER diagrams','OPEN',NULL),(6,2,'DSA Engineer Trainee','Implement algorithms and data structures for optimization in Pune tech firm. Solve coding challenges and contribute to app logic. Perfect for competitive exam preppers.\n\n','Data Structures, Algorithms, Java, Python, sorting, problem-solving','OPEN',NULL),(7,3,'UI/UX Designer Junior','Design wireframes and prototypes for web apps in Pune. Collaborate with devs on user-centered interfaces. Great for creative IT students with drawing hobbies.','Figma, Adobe XD, UI/UX, wireframing, prototyping, HTML/CSS','OPEN','2026-01-31 16:31:25.006952'),(8,1,'Full Stack Angular','Our client is a French multinational information technology (IT) services and consulting company, headquartered in Paris, France. Founded in 1967, It has been a leader in business transformation for over 50 years, leveraging technology to address a wide range of business needs, from strategy and design to managing operations.\n\nThe company is committed to unleashing human energy through technology for an inclusive and sustainable future, helping organizations accelerate their transition to a digital and sustainable world. They provide a variety of services, including consulting, technology, professional, and outsourcing services.','Skills and Expertise • Strong organizational and project management skills. • Familiarity with Agile Scrum will be added advantage • Proficiency with front end languages such as HTML, CSS and JavaScript. • Familiarity with one of the JavaScript frameworks such as Angular JS, Angular 2/4/5/6/7/8 or React • Proficiency with one of the server-side languages such as Python • Proficiency with one of the Python frameworks such as Django or Flask • Familiarity with database technology such as MySQL, PostgreSQL, Oracle and MongoDB.','OPEN','2026-02-04 13:04:08.831621'),(9,1,'AI Engineer','Build, train, and optimize ML models for real-world applications, ensuring robust deployment pipelines.','Cloud , Python','OPEN','2026-02-04 17:24:49.845084'),(10,1,'Army bharti','i love my india','running,long jumb','OPEN','2026-02-04 18:07:05.491581');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referrals` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `job_id` bigint NOT NULL,
  `candidate_id` bigint NOT NULL,
  `employee_id` bigint NOT NULL,
  `referral_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_job_candidate` (`job_id`,`candidate_id`),
  UNIQUE KEY `IX_referrals_job_id_candidate_id` (`job_id`,`candidate_id`),
  KEY `IX_referrals_candidate_id` (`candidate_id`),
  KEY `IX_referrals_employee_id` (`employee_id`),
  CONSTRAINT `FK_referrals_candidates_candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_referrals_employees_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_referrals_jobs_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`),
  CONSTRAINT `referrals_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referrals`
--

LOCK TABLES `referrals` WRITE;
/*!40000 ALTER TABLE `referrals` DISABLE KEYS */;
INSERT INTO `referrals` VALUES (1,1,2,5,'2026-02-02 15:47:19',0),(2,1,4,5,'2026-02-02 15:48:41',0),(3,2,4,5,'2026-02-02 18:21:53',0),(4,8,7,5,'2026-02-04 11:10:50',0),(5,8,4,5,'2026-02-04 11:31:44',0),(6,1,7,5,'2026-02-04 11:32:17',0),(7,2,6,5,'2026-02-04 12:02:29',0),(8,9,4,3,'2026-02-04 12:28:22',0),(9,8,1,5,'2026-02-04 12:39:08',0),(10,1,1,6,'2026-02-04 12:49:40',0);
/*!40000 ALTER TABLE `referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','COMPANY','CANDIDATE','EMPLOYEE') NOT NULL,
  `is_active` bit(1) DEFAULT b'1',
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@hirehub.com','$2a$10$pYVvNtIeRe6MBtofyCt2VuH..AvKnNjGlqmNg808RpKFtgZgt8u8W','ADMIN',_binary '','2026-01-30 20:09:19.000000'),(2,'ojas@gmail.com','$2a$10$8SHeR7eCVL6gsKu3ScBv6e.RAUQJZlnx5xZPJo63Q2JrexP6fSs8.','CANDIDATE',_binary '','2026-01-30 20:10:55.685150'),(3,'tcs@gmail.com','$2a$10$ThXNTwgpHD2RVgnSgVliMOYgymWI6jR9BhmbmNkXHtlV0RiXw4CNS','COMPANY',_binary '','2026-01-30 20:30:58.507889'),(4,'vaibhav@gmail.com','$2a$10$hCxLCmnyrgf4TavYP3XSI.lKsQG9jdvu7t5iINorDzjNrVY73Od9O','EMPLOYEE',_binary '','2026-01-30 20:50:09.876876'),(5,'meta@gmail.com','$2a$10$ZO.gEnm7maIasVsD3/mM8upXozenfTQbq9hAtigjHu7z7Bf5iurvS','COMPANY',_binary '','2026-01-30 21:23:27.611186'),(6,'sujay@gmail.com','$2a$10$Yb1dLj/BQidaMcP2hObB7.7VJwaF03tywBBRdce42wxTTfRZsAWjO','CANDIDATE',_binary '','2026-01-30 21:43:18.199133'),(7,'goraksh@gmail.com','$2a$10$TLEFf.VQ8I.f/ObGdayit.1Ct4gMg4qh/Kv75FFvyGmhlsvQogOPK','EMPLOYEE',_binary '','2026-01-30 21:43:42.849787'),(8,'knowit@gmail.com','$2a$10$UyMWqTyU5u53B0nRO0vMUuj1Y4hLQ2fgon3XcKh2pdw5vxtRMODBK','COMPANY',_binary '','2026-01-31 15:07:17.576423'),(9,'jio@gmail.com','$2a$10$jYLxwG6rwqSyoHc6QS7WgONZZdDQzQbbr6ysMdR0d89wFx.rNo7Q6','COMPANY',_binary '','2026-01-31 17:12:47.060045'),(10,'omkar@gmail.com','$2a$10$.O78buggEz/qkwOX0b4zjeV.U/FBRrvjZT/kImZ/VYHcz1lDdHW72','EMPLOYEE',_binary '','2026-02-01 00:41:14.197233'),(11,'jay@gmail.com','$2a$10$NgmlJoP.TxDuyZiOZO866unnhJ6sRzL8Lx3cJj.GrhJWv7J1fLYzC','CANDIDATE',_binary '','2026-02-01 16:50:53.299869'),(12,'ram@gmail.com','$2a$10$AZITAqFdu2GqCiqn4ZBFd.rDLbEN8eLjCML7R4hLgA8KCPskGRFb6','EMPLOYEE',_binary '','2026-02-01 16:52:07.598694'),(13,'citi@gmail.com','$2a$10$3usYKAbqojzIEGWnmSXed.Vo1UWb0K211xFL.l.MXvO57mrlHBPOq','COMPANY',_binary '','2026-02-02 12:12:07.790985'),(14,'shubham@gmail.com','$2a$10$x7iSnmTUqSPr7LqcfUEEJue5J8/hS5MLIiCHKEzt6qnDFgQmAeiga','CANDIDATE',_binary '','2026-02-02 14:59:58.602628'),(15,'neeraj@gmail.com','$2a$10$e5c8WWNeWMtOpLWulzpqu.xMhd5eIwMdq8rPRLqNzwbqNrqBar2ju','EMPLOYEE',_binary '','2026-02-02 15:05:04.452449'),(16,'lt@gmail.com','$2a$10$t7AY6YDKVZx8P9Mt6OBRG.nSz3DtUE.I89Kro3yK0EiEwsMnOEZSy','CANDIDATE',_binary '','2026-02-03 00:14:49.921532'),(17,'samir@gmail.com','$2a$10$kya7BKgYQEzkAERPJT/s0.HJFF2A0f80CNqbbzKyEynUpJ78cmIiq','CANDIDATE',_binary '','2026-02-03 11:39:49.771959'),(18,'shripad@gmail.com','$2a$10$Iyt6UoInuTKu4RZmiNfC2eJvU0JfYk0hiL3dcJwJsIHE2sPJT8Jei','EMPLOYEE',_binary '','2026-02-04 13:25:57.758881'),(19,'kalpesh@gmail.com','$2a$10$ceoft/PmZmcKWUIE9hDtR.7pfR3BaapN41IZnx4DhV09QIPSCPG9u','CANDIDATE',_binary '','2026-02-04 13:39:38.056701'),(20,'tarun@gmail.com','$2a$10$/C/3MrpogAj/4dG5E8AW0.6ESgOxEd09qq0VRDpWxNZdOlJohp18O','CANDIDATE',_binary '','2026-02-04 17:19:14.582880'),(21,'amit@gmail.com','$2a$10$DsuddoIZHh3ZzohlMLUOKekZ.M8Bh51p3usX8mGaXlhHy5dNlz7ra','CANDIDATE',_binary '','2026-02-04 18:13:54.182069');
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

-- Dump completed on 2026-02-04 18:51:17
