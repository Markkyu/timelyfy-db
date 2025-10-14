-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2025 at 03:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timelyfydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
  `college_id` int(11) NOT NULL,
  `college_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`college_id`, `college_name`) VALUES
(1, 'Computer Science'),
(2, 'Computer Engineering'),
(3, 'Psychology'),
(4, 'Hospitality Management'),
(5, 'Nursing'),
(7, 'Elementary Education'),
(8, 'Tourism Management'),
(9, 'Accountancy'),
(34, 'Secondary Education Major in Mathematics'),
(36, 'Secondary Education Major in Science'),
(37, 'Business Administration Major in Financial Management'),
(38, 'Secondary Education Major in English'),
(39, 'Secondary Education Major in Social Studies'),
(40, 'Secondary Education Major in Filipino'),
(41, 'Business Administration Major in Human Resource Development Management'),
(42, 'Business Administration (Major in Marketing Management)');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_code` varchar(10) NOT NULL,
  `course_name` text NOT NULL,
  `hours_week` int(11) NOT NULL,
  `course_year` int(11) NOT NULL,
  `course_college` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `assigned_teacher` int(11) DEFAULT NULL,
  `is_plotted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_code`, `course_name`, `hours_week`, `course_year`, `course_college`, `semester`, `assigned_teacher`, `is_plotted`) VALUES
(1, 'CCS101', 'Computer Programming 1', 5, 1, 1, 1, 1, 0),
(4, 'UNI101', 'University and I', 2, 1, 1, 2, NULL, 0),
(19, 'GEL1A3', 'Living in the IT Era', 3, 1, 1, 1, 4, 0),
(20, 'EIS102', 'The Family', 3, 1, 1, 1, NULL, 0),
(21, 'CCS102', 'Programming 102', 3, 1, 1, 2, 4, 0),
(24, 'GEL105', 'English Enhancement Course', 3, 1, 1, 1, NULL, 0),
(25, 'PED101', 'Wellness and Fitness', 3, 1, 1, 1, NULL, 0),
(26, 'CCS100', 'Introduction to Computing', 3, 1, 1, 1, 2, 0),
(27, 'GE102', 'Purposive Communication', 3, 1, 1, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `phase_control`
--

CREATE TABLE `phase_control` (
  `phase_id` int(11) NOT NULL,
  `phase_year` int(11) NOT NULL,
  `phase_sem` int(11) NOT NULL,
  `phase_supervisor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phase_control`
--

INSERT INTO `phase_control` (`phase_id`, `phase_year`, `phase_sem`, `phase_supervisor`) VALUES
(1, 1, 1, 'master_scheduler');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL DEFAULT 'user',
  `role` enum('admin','master_scheduler','super_user','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `username`, `password`, `role`) VALUES
(1, 'Markkyu', '$2b$10$AvVCygLuYZtTnAp5zzH34eh9LIRDPWWetpQX1VHbYfLB.WeogD.8q', 'admin'),
(3, 'saging', '$2b$10$YD6WnhoIumUT3IXkF3Zjgu0ZnuXnfHSAjicfxLrTPuybOOmjhcH3O', 'user'),
(4, 'frenzy', '$2b$10$OVRW.gQr.QtD1cEWDXUjCOICDLCk9oq7Qf5egjEV64nr6xDjTmoi.', 'super_user'),
(5, 'vernie', '$2b$10$UoiheGdo88pDsM.jI41.mOXRaVwk8CEXoPk5LcXQtrjVm77xPaMs6', 'master_scheduler'),
(6, 'admin', '$2b$10$TTIgNemUoQtSon1OOtRs4OfFlBlq3HpuTUtrB8CqecQtdJUBlZYxi', 'admin'),
(7, 'user', '$2b$10$lnMBjD7iTc/k2A08k9yYEeWjV/HPlf28sMHqsBwTxfR9dLAfDN8OS', 'user'),
(8, 'superuser', '$2b$10$C1p5FYnMu5IQyGV6jSjXhOnYLWp0gsgTkmIFcoV25E11Mds1hEpMG', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `room_name` text NOT NULL,
  `capacity` int(11) NOT NULL,
  `room_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL,
  `time_start` varchar(50) NOT NULL,
  `time_end` varchar(50) NOT NULL,
  `course_id` int(11) NOT NULL,
  `duration` decimal(3,1) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `college_id` int(11) NOT NULL,
  `year_level` int(11) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `department` int(11) NOT NULL,
  `teacher_availability` enum('full','custom') NOT NULL DEFAULT 'full'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `first_name`, `last_name`, `department`, `teacher_availability`) VALUES
(1, 'Aldwin', 'Ilumin', 1, 'full'),
(2, 'Wishiel', 'Ilumin', 1, 'full'),
(3, 'Karen', 'Hermosa', 1, 'full'),
(4, 'Noelyn', 'Sebua', 1, 'full'),
(5, 'Virgilio', 'Abarquez', 2, 'full'),
(13, 'Dennis', 'Chumacera', 2, 'full'),
(24, 'Wishikola', 'Hamburguesa', 1, 'full'),
(25, 'Aldwinaka', 'Bottomesa', 1, 'full');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_schedules`
--

CREATE TABLE `teacher_schedules` (
  `teacher_schedule_id` int(20) NOT NULL,
  `teacher_id` varchar(20) NOT NULL,
  `teacher_name` varchar(20) NOT NULL,
  `teacher_time_day` int(20) NOT NULL,
  `teacher_slot_time` int(20) NOT NULL,
  `teacher_slot_course` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_schedules`
--

INSERT INTO `teacher_schedules` (`teacher_schedule_id`, `teacher_id`, `teacher_name`, `teacher_time_day`, `teacher_slot_time`, `teacher_slot_course`) VALUES
(1, 'Aldwin', '1', 1, 1, 0),
(2, 'Aldwin', '1', 1, 2, 0),
(3, 'Aldwin', '1', 1, 3, 0),
(4, 'Aldwin', '1', 1, 4, 0),
(5, 'Aldwin', '1', 1, 5, 0),
(6, 'Aldwin', '1', 1, 6, 0),
(7, 'Aldwin', '1', 1, 7, 0),
(8, 'Aldwin', '1', 1, 8, 0),
(9, 'Aldwin', '1', 1, 9, 0),
(10, 'Aldwin', '1', 1, 10, 0),
(11, 'Aldwin', '1', 1, 11, 0),
(12, 'Aldwin', '1', 1, 12, 0),
(13, 'Aldwin', '1', 1, 13, 0),
(14, 'Aldwin', '1', 1, 14, 0),
(15, 'Aldwin', '1', 1, 15, 0),
(16, 'Aldwin', '1', 1, 16, 0),
(17, 'Aldwin', '1', 1, 17, 0),
(18, 'Aldwin', '1', 1, 18, 0),
(19, 'Aldwin', '1', 1, 19, 0),
(20, 'Aldwin', '1', 1, 20, 0),
(21, 'Aldwin', '1', 1, 21, 0),
(22, 'Aldwin', '1', 1, 22, 0),
(23, 'Aldwin', '1', 1, 23, 0),
(24, 'Aldwin', '1', 1, 24, 0),
(25, 'Aldwin', '1', 2, 1, 0),
(26, 'Aldwin', '1', 2, 2, 0),
(27, 'Aldwin', '1', 2, 3, 0),
(28, 'Aldwin', '1', 2, 4, 0),
(29, 'Aldwin', '1', 2, 5, 0),
(30, 'Aldwin', '1', 2, 6, 0),
(31, 'Aldwin', '1', 2, 7, 0),
(32, 'Aldwin', '1', 2, 8, 0),
(33, 'Aldwin', '1', 2, 9, 0),
(34, 'Aldwin', '1', 2, 10, 0),
(35, 'Aldwin', '1', 2, 11, 0),
(36, 'Aldwin', '1', 2, 12, 0),
(37, 'Aldwin', '1', 2, 13, 0),
(38, 'Aldwin', '1', 2, 14, 0),
(39, 'Aldwin', '1', 2, 15, 0),
(40, 'Aldwin', '1', 2, 16, 0),
(41, 'Aldwin', '1', 2, 17, 0),
(42, 'Aldwin', '1', 2, 18, 0),
(43, 'Aldwin', '1', 2, 19, 0),
(44, 'Aldwin', '1', 2, 20, 0),
(45, 'Aldwin', '1', 2, 21, 0),
(46, 'Aldwin', '1', 2, 22, 0),
(47, 'Aldwin', '1', 2, 23, 0),
(48, 'Aldwin', '1', 2, 24, 0),
(49, 'Aldwin', '1', 3, 1, 0),
(50, 'Aldwin', '1', 3, 2, 0),
(51, 'Aldwin', '1', 3, 3, 0),
(52, 'Aldwin', '1', 3, 4, 0),
(53, 'Aldwin', '1', 3, 5, 0),
(54, 'Aldwin', '1', 3, 6, 0),
(55, 'Aldwin', '1', 3, 7, 0),
(56, 'Aldwin', '1', 3, 8, 0),
(57, 'Aldwin', '1', 3, 9, 0),
(58, 'Aldwin', '1', 3, 10, 0),
(59, 'Aldwin', '1', 3, 11, 0),
(60, 'Aldwin', '1', 3, 12, 0),
(61, 'Aldwin', '1', 3, 13, 0),
(62, 'Aldwin', '1', 3, 14, 0),
(63, 'Aldwin', '1', 3, 15, 0),
(64, 'Aldwin', '1', 3, 16, 0),
(65, 'Aldwin', '1', 3, 17, 0),
(66, 'Aldwin', '1', 3, 18, 0),
(67, 'Aldwin', '1', 3, 19, 0),
(68, 'Aldwin', '1', 3, 20, 0),
(69, 'Aldwin', '1', 3, 21, 0),
(70, 'Aldwin', '1', 3, 22, 0),
(71, 'Aldwin', '1', 3, 23, 0),
(72, 'Aldwin', '1', 3, 24, 0),
(73, 'Aldwin', '1', 4, 1, 0),
(74, 'Aldwin', '1', 4, 2, 0),
(75, 'Aldwin', '1', 4, 3, 0),
(76, 'Aldwin', '1', 4, 4, 0),
(77, 'Aldwin', '1', 4, 5, 0),
(78, 'Aldwin', '1', 4, 6, 0),
(79, 'Aldwin', '1', 4, 7, 0),
(80, 'Aldwin', '1', 4, 8, 0),
(81, 'Aldwin', '1', 4, 9, 0),
(82, 'Aldwin', '1', 4, 10, 0),
(83, 'Aldwin', '1', 4, 11, 0),
(84, 'Aldwin', '1', 4, 12, 0),
(85, 'Aldwin', '1', 4, 13, 0),
(86, 'Aldwin', '1', 4, 14, 0),
(87, 'Aldwin', '1', 4, 15, 0),
(88, 'Aldwin', '1', 4, 16, 0),
(89, 'Aldwin', '1', 4, 17, 0),
(90, 'Aldwin', '1', 4, 18, 0),
(91, 'Aldwin', '1', 4, 19, 0),
(92, 'Aldwin', '1', 4, 20, 0),
(93, 'Aldwin', '1', 4, 21, 0),
(94, 'Aldwin', '1', 4, 22, 0),
(95, 'Aldwin', '1', 4, 23, 0),
(96, 'Aldwin', '1', 4, 24, 0),
(97, 'Aldwin', '1', 5, 1, 0),
(98, 'Aldwin', '1', 5, 2, 0),
(99, 'Aldwin', '1', 5, 3, 0),
(100, 'Aldwin', '1', 5, 4, 0),
(101, 'Aldwin', '1', 5, 5, 0),
(102, 'Aldwin', '1', 5, 6, 0),
(103, 'Aldwin', '1', 5, 7, 0),
(104, 'Aldwin', '1', 5, 8, 0),
(105, 'Aldwin', '1', 5, 9, 0),
(106, 'Aldwin', '1', 5, 10, 0),
(107, 'Aldwin', '1', 5, 11, 0),
(108, 'Aldwin', '1', 5, 12, 0),
(109, 'Aldwin', '1', 5, 13, 0),
(110, 'Aldwin', '1', 5, 14, 0),
(111, 'Aldwin', '1', 5, 15, 0),
(112, 'Aldwin', '1', 5, 16, 0),
(113, 'Aldwin', '1', 5, 17, 0),
(114, 'Aldwin', '1', 5, 18, 0),
(115, 'Aldwin', '1', 5, 19, 0),
(116, 'Aldwin', '1', 5, 20, 0),
(117, 'Aldwin', '1', 5, 21, 0),
(118, 'Aldwin', '1', 5, 22, 0),
(119, 'Aldwin', '1', 5, 23, 0),
(120, 'Aldwin', '1', 5, 24, 0),
(121, 'Aldwin', '1', 6, 1, 0),
(122, 'Aldwin', '1', 6, 2, 0),
(123, 'Aldwin', '1', 6, 3, 0),
(124, 'Aldwin', '1', 6, 4, 0),
(125, 'Aldwin', '1', 6, 5, 0),
(126, 'Aldwin', '1', 6, 6, 0),
(127, 'Aldwin', '1', 6, 7, 0),
(128, 'Aldwin', '1', 6, 8, 0),
(129, 'Aldwin', '1', 6, 9, 0),
(130, 'Aldwin', '1', 6, 10, 0),
(131, 'Aldwin', '1', 6, 11, 0),
(132, 'Aldwin', '1', 6, 12, 0),
(133, 'Aldwin', '1', 6, 13, 0),
(134, 'Aldwin', '1', 6, 14, 0),
(135, 'Aldwin', '1', 6, 15, 0),
(136, 'Aldwin', '1', 6, 16, 0),
(137, 'Aldwin', '1', 6, 17, 0),
(138, 'Aldwin', '1', 6, 18, 0),
(139, 'Aldwin', '1', 6, 19, 0),
(140, 'Aldwin', '1', 6, 20, 0),
(141, 'Aldwin', '1', 6, 21, 0),
(142, 'Aldwin', '1', 6, 22, 0),
(143, 'Aldwin', '1', 6, 23, 0),
(144, 'Aldwin', '1', 6, 24, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_programs`
--

CREATE TABLE `user_programs` (
  `user_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_programs`
--

INSERT INTO `user_programs` (`user_id`, `program_id`) VALUES
(1, 1),
(3, 1),
(3, 3),
(4, 1),
(4, 2),
(4, 5),
(7, 1),
(7, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`college_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `assigned_teacher` (`assigned_teacher`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `first_name` (`first_name`,`last_name`) USING HASH;

--
-- Indexes for table `teacher_schedules`
--
ALTER TABLE `teacher_schedules`
  ADD PRIMARY KEY (`teacher_schedule_id`);

--
-- Indexes for table `user_programs`
--
ALTER TABLE `user_programs`
  ADD PRIMARY KEY (`user_id`,`program_id`),
  ADD KEY `program_id` (`program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `college_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`assigned_teacher`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`),
  ADD CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

--
-- Constraints for table `user_programs`
--
ALTER TABLE `user_programs`
  ADD CONSTRAINT `user_programs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`),
  ADD CONSTRAINT `user_programs_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `colleges` (`college_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
