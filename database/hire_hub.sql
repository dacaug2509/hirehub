-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2026 at 06:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hire_hub`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `candidate_id` bigint(20) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `created_at`, `status`, `candidate_id`, `job_id`) VALUES
(4, '2026-01-03 14:15:35.000000', 'Shortlisted', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `application_status_logs`
--

CREATE TABLE `application_status_logs` (
  `log_id` bigint(20) NOT NULL,
  `from_status` varchar(255) DEFAULT NULL,
  `to_status` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `application_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application_status_logs`
--

INSERT INTO `application_status_logs` (`log_id`, `from_status`, `to_status`, `updated_at`, `application_id`) VALUES
(1, 'applied', 'Shortlisted', '2026-01-03 15:48:32.000000', 4);

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `candidate_id` bigint(20) NOT NULL,
  `certifications` text DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `current_company` varchar(255) DEFAULT NULL,
  `current_job_title` varchar(255) DEFAULT NULL,
  `current_salary` int(11) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `education` text DEFAULT NULL,
  `employment_type` varchar(255) DEFAULT NULL,
  `expected_salary` int(11) DEFAULT NULL,
  `experience` text DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `notice_period` varchar(255) DEFAULT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `preferred_locations` text DEFAULT NULL,
  `projects` text DEFAULT NULL,
  `resume_headline` varchar(255) DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `work_type` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`candidate_id`, `certifications`, `created_at`, `current_company`, `current_job_title`, `current_salary`, `degree`, `education`, `employment_type`, `expected_salary`, `experience`, `experience_years`, `github_url`, `linkedin_url`, `notice_period`, `portfolio_url`, `preferred_locations`, `projects`, `resume_headline`, `resume_url`, `skills`, `summary`, `updated_at`, `work_type`, `user_id`) VALUES
(1, NULL, '2026-01-03 11:58:54.000000', 'WebMD', 'Trainee Software Engineer', 678000, 'B.Tech', 'Bachleor\'s In Computer Engineer', 'Full Time', 900000, 'I have 6 years of experience', 6, 'https://github.com/scammerpatil', 'https://linkedin.com/in/scammerpatil', '0', 'https://scammerpatil.vercel.app/', NULL, 'Many', 'Experienced Software Developer', NULL, 'React JS, JavaScript, Next JS, ASP.NET Core, Django', 'Passionate about building innovative tech solutions, I specialize in creating seamless web experiences and AI-driven applications. With expertise across MERN stack, AIML, and emerging technologies, I bring ideas to life with precision and creativity.', '2026-01-03 13:13:11.000000', 'On-Site', 3);

-- --------------------------------------------------------

--
-- Table structure for table `candidate_mcq_answers`
--

CREATE TABLE `candidate_mcq_answers` (
  `id` bigint(20) NOT NULL,
  `selected_option` char(1) DEFAULT NULL,
  `attempt_attempt_id` bigint(20) DEFAULT NULL,
  `question_question_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidate_mcq_attempts`
--

CREATE TABLE `candidate_mcq_attempts` (
  `attempt_id` bigint(20) NOT NULL,
  `correct_answers` int(11) DEFAULT NULL,
  `passed` bit(1) DEFAULT NULL,
  `started_at` datetime(6) DEFAULT NULL,
  `submitted_at` datetime(6) DEFAULT NULL,
  `total_questions` int(11) DEFAULT NULL,
  `candidate_candidate_id` bigint(20) DEFAULT NULL,
  `job_job_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `company_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `company_size` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `is_blocked` bit(1) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `address`, `company_size`, `created_at`, `description`, `industry`, `is_blocked`, `website`, `user_id`) VALUES
(1, 'Plot No. 1, Rajiv Gandhi Infotech Park, MIDC Phase III, Hinjewadi, Pune - 411057', '200000', '2026-01-03 11:56:46.000000', ' Plot No. 1, Rajiv Gandhi Infotech Park, MIDC Phase III, Hinjewadi, Pune - 411057', 'Technology', b'0', 'http://infosys.com/', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` bigint(20) NOT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `company_id`, `user_id`) VALUES
(1, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `job_id` bigint(20) NOT NULL,
  `job_category` varchar(255) DEFAULT NULL,
  `job_description` text DEFAULT NULL,
  `job_location` varchar(255) DEFAULT NULL,
  `job_position` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `max_package` double DEFAULT NULL,
  `min_package` double DEFAULT NULL,
  `posted_at` datetime(6) DEFAULT NULL,
  `required_degrees` varchar(255) DEFAULT NULL,
  `required_experience` int(11) DEFAULT NULL,
  `required_skills` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `test_required` bit(1) DEFAULT NULL,
  `total_openings` int(11) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`job_id`, `job_category`, `job_description`, `job_location`, `job_position`, `job_title`, `max_package`, `min_package`, `posted_at`, `required_degrees`, `required_experience`, `required_skills`, `status`, `test_required`, `total_openings`, `company_id`) VALUES
(1, 'Full-Time', '# Job Description: Senior Software Developer\n\n## Job Title\n**Senior Software Developer**\n\n## Position\nSenior Software Developer\n\n## Location\n*To be specified*\n\n## Job Type\n*Full-Time*\n\n## Compensation\n- **Minimum Package:** 14 LPA  \n- **Maximum Package:** 18 LPA  \n\n## Number of Openings\n**1000**\n\n## Experience Required\n- **Minimum Experience:** 5 years\n\n## Required Education\n- B.Tech  \n- M.Tech  \n- B.E  \n- M.E  \n\n## Required Skills\n- JavaScript  \n- Next.js  \n- ASP.NET Core  \n- Django  \n\n## Job Summary\nWe are looking for an experienced **Senior Software Developer** to design, develop, and maintain scalable software solutions. The ideal candidate should have strong hands-on experience in modern web technologies and backend frameworks, along with the ability to lead development efforts and collaborate with cross-functional teams.\n\n## Key Responsibilities\n- Design, develop, test, and deploy high-quality software applications\n- Build scalable and secure web applications using modern frameworks\n- Collaborate with product managers, designers, and other developers\n- Write clean, maintainable, and well-documented code\n- Optimize applications for performance and scalability\n- Review code and mentor junior developers\n- Troubleshoot, debug, and upgrade existing systems\n- Follow best practices in software development and system design\n\n## Required Qualifications\n- Minimum 5 years of professional software development experience\n- Strong proficiency in **JavaScript** and modern frameworks like **Next.js**\n- Experience with backend frameworks such as **ASP.NET Core** and **Django**\n- Strong understanding of RESTful APIs and web services\n- Experience with databases and ORM tools\n- Knowledge of version control systems (Git)\n- Strong problem-solving and analytical skills\n\n## Preferred Skills\n- Experience with cloud platforms (AWS, Azure, or GCP)\n- Familiarity with CI/CD pipelines\n- Knowledge of microservices architecture\n- Understanding of security best practices\n\n## What We Offer\n- Competitive salary package (14–18 LPA)\n- Opportunity to work on large-scale projects\n- Career growth and learning opportunities\n- Collaborative and innovative work environment\n\n---\n\n**Apply now** to be part of a dynamic team building next-generation software solutions.', 'On-site', 'Software Engineer', 'Senior Software Developer', 18, 14, '2026-01-03 12:03:25.000000', 'B.Tech,    M.Tech,   B.E,  M.E', 5, 'JavaScript,      Next JS,     ASP.NET Core,  Django', 'Active', NULL, 1000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mcq_questions`
--

CREATE TABLE `mcq_questions` (
  `question_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `correct_option` char(1) DEFAULT NULL,
  `optiona` varchar(255) DEFAULT NULL,
  `optionb` varchar(255) DEFAULT NULL,
  `optionc` varchar(255) DEFAULT NULL,
  `optiond` varchar(255) DEFAULT NULL,
  `question_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mcq_questions`
--

INSERT INTO `mcq_questions` (`question_id`, `active`, `category`, `correct_option`, `optiona`, `optionb`, `optionc`, `optiond`, `question_text`) VALUES
(1, b'1', 'Java', 'C', 'int', 'float', 'String', 'boolean', 'Which of the following is not a primitive data type in Java?'),
(2, b'1', 'OOPs', 'D', 'Encapsulation', 'Abstraction', 'Polymorphism', 'Inheritance', 'Which OOP principle allows a class to acquire properties of another class?'),
(3, b'1', 'Data Structures', 'B', 'Stack', 'Queue', 'Tree', 'Graph', 'Which data structure follows FIFO order?'),
(4, b'1', 'React', 'C', 'useState', 'useRef', 'useEffect', 'useMemo', 'Which hook is used to perform side effects in React?'),
(5, b'1', 'JavaScript', 'D', 'var', 'let', 'static', 'const', 'Which keyword is used to declare a constant in JavaScript'),
(6, b'1', 'Java', 'C', 'this', 'super', 'extends', 'implements', 'Which keyword is used to inherit a class in Java?'),
(7, b'1', 'OOPs', 'D', 'Overriding', 'Encapsulation', 'Abstraction', 'Overloading', 'Which concept allows the same method name with different parameters?'),
(8, b'1', 'React', 'B', 'Component is destroyed', 'Component re-renders', 'DOM reloads', 'Page refreshes', 'What is the default behavior of React components when state changes?'),
(9, b'1', 'JavaScript', 'B', 'JSON.stringify()', 'JSON.parse()', 'Object.parse()', 'Object.stringify()', 'Which method converts a JSON string into a JavaScript object?'),
(10, b'1', 'Data Structures', 'C', 'Queue', 'Heap', 'Stack', 'Linked List', 'Which data structure is best suited for recursive function calls?');

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `referral_id` bigint(20) NOT NULL,
  `referral_date` datetime(6) DEFAULT NULL,
  `referral_status` varchar(255) DEFAULT NULL,
  `employee_id` bigint(20) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `referred_candidate_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `referrals`
--

INSERT INTO `referrals` (`referral_id`, `referral_date`, `referral_status`, `employee_id`, `job_id`, `referred_candidate_id`) VALUES
(1, '2026-01-03 22:39:25.000000', NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `created_at`, `email`, `full_name`, `password`, `phone`, `profile_image`, `role`) VALUES
(1, '2026-01-03 10:44:53.000000', 'admin@hirehub.com', 'Saurav Deepak Patil', '$2a$10$lrGrgMkCnTD7Jzhs9yCLS.zOrBzOUL6xkCdUYVVtqeq3g8PXU3pYa', '7499455643', 'https://cdn-icons-png.flaticon.com/512/9703/9703596.png', 'admin'),
(2, '2026-01-03 11:56:46.000000', 'admin@infosys.com', 'Infosys India Pvt. LTD.', '$2a$10$tZtPp4mNGHp2Tfo7MVFkNu/kKnzziiNmwinjEan7LvFWq0UVNoqLK', '9999999999', '/companies-logo/Infosys_India_Pvt._LTD..jpg', 'company'),
(3, '2026-01-03 11:58:53.000000', 'sauravpatil453@gmail.com', 'Saurav Deepak Patil', '$2a$10$2fM2d/UEHuUln.w7KptvQuHMDxGu1fapiA5i.Pnm/RSVIUZgmGQlS', '7499455643', '/applicant-profile-images/Saurav_Deepak_Patil.jpg', 'candidate'),
(4, '2026-01-03 15:09:47.000000', 'sauravpatil.rcpit@gmail.com', 'Saurav Deepak Patil', '$2a$10$8UoSpNZTTZzUEYb4hGM8HeCiLGNQNyq8vCkU47AE4B8yGQwvB/wKS', '7499455643', '/employee-profile-images/Saurav_Deepak_Patil.jpg', 'employee');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `FKg4e16cwk1qrad923bpx4hamdh` (`candidate_id`),
  ADD KEY `FKbkpg298263wbfsy1m2bfy2vkf` (`job_id`);

--
-- Indexes for table `application_status_logs`
--
ALTER TABLE `application_status_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `FK2t8chchtrofp43cxhh2qwxtwe` (`application_id`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`candidate_id`),
  ADD UNIQUE KEY `UKdoi1o7iyehcrqrrrbxjostvv5` (`user_id`);

--
-- Indexes for table `candidate_mcq_answers`
--
ALTER TABLE `candidate_mcq_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq3h8cyeuoa1nxuyc7x4u93ytu` (`attempt_attempt_id`),
  ADD KEY `FK18lo7jnthq84bqafn33ng8thy` (`question_question_id`);

--
-- Indexes for table `candidate_mcq_attempts`
--
ALTER TABLE `candidate_mcq_attempts`
  ADD PRIMARY KEY (`attempt_id`),
  ADD KEY `FK6akfvx42htoqoiuudkqc8r1sg` (`candidate_candidate_id`),
  ADD KEY `FKg539fck3yk9dh8jndfeck8lkq` (`job_job_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `FK9l5d0fem75e59uwf9upwuf9du` (`user_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `UKj2dmgsma6pont6kf7nic9elpd` (`user_id`),
  ADD KEY `FK1ekpcbo0lmdx6ou8e3fh9j4lq` (`company_id`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `FKdo1ciglrqsfeh828xjf622bvr` (`company_id`);

--
-- Indexes for table `mcq_questions`
--
ALTER TABLE `mcq_questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`referral_id`),
  ADD KEY `FK8s1w6j142r933ri76bt4e2lmy` (`employee_id`),
  ADD KEY `FKnb9mshs9xr96aihiknuk11e4y` (`job_id`),
  ADD KEY `FKih9bed362n3ghn7phtm14ksv9` (`referred_candidate_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `application_status_logs`
--
ALTER TABLE `application_status_logs`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `candidate_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidate_mcq_answers`
--
ALTER TABLE `candidate_mcq_answers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `candidate_mcq_attempts`
--
ALTER TABLE `candidate_mcq_attempts`
  MODIFY `attempt_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `company_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `job_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mcq_questions`
--
ALTER TABLE `mcq_questions`
  MODIFY `question_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `referral_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `FKbkpg298263wbfsy1m2bfy2vkf` FOREIGN KEY (`job_id`) REFERENCES `job_posts` (`job_id`),
  ADD CONSTRAINT `FKg4e16cwk1qrad923bpx4hamdh` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`candidate_id`);

--
-- Constraints for table `application_status_logs`
--
ALTER TABLE `application_status_logs`
  ADD CONSTRAINT `FK2t8chchtrofp43cxhh2qwxtwe` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`);

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `FKme4fkelukmx2s63tlcrft6hio` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `candidate_mcq_answers`
--
ALTER TABLE `candidate_mcq_answers`
  ADD CONSTRAINT `FK18lo7jnthq84bqafn33ng8thy` FOREIGN KEY (`question_question_id`) REFERENCES `mcq_questions` (`question_id`),
  ADD CONSTRAINT `FKq3h8cyeuoa1nxuyc7x4u93ytu` FOREIGN KEY (`attempt_attempt_id`) REFERENCES `candidate_mcq_attempts` (`attempt_id`);

--
-- Constraints for table `candidate_mcq_attempts`
--
ALTER TABLE `candidate_mcq_attempts`
  ADD CONSTRAINT `FK6akfvx42htoqoiuudkqc8r1sg` FOREIGN KEY (`candidate_candidate_id`) REFERENCES `candidates` (`candidate_id`),
  ADD CONSTRAINT `FKg539fck3yk9dh8jndfeck8lkq` FOREIGN KEY (`job_job_id`) REFERENCES `job_posts` (`job_id`);

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `FK9l5d0fem75e59uwf9upwuf9du` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `FK1ekpcbo0lmdx6ou8e3fh9j4lq` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  ADD CONSTRAINT `FK69x3vjuy1t5p18a5llb8h2fjx` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `FKdo1ciglrqsfeh828xjf622bvr` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`);

--
-- Constraints for table `referrals`
--
ALTER TABLE `referrals`
  ADD CONSTRAINT `FK8s1w6j142r933ri76bt4e2lmy` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `FKih9bed362n3ghn7phtm14ksv9` FOREIGN KEY (`referred_candidate_id`) REFERENCES `candidates` (`candidate_id`),
  ADD CONSTRAINT `FKnb9mshs9xr96aihiknuk11e4y` FOREIGN KEY (`job_id`) REFERENCES `job_posts` (`job_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
