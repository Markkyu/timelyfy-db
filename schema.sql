-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2025 at 05:57 PM
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
(6, 'Secondary Education'),
(7, 'Elementary Education'),
(8, 'Tourism Management'),
(9, 'Accountancy'),
(10, 'Business Administration');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` text NOT NULL,
  `hours_week` int(11) NOT NULL,
  `course_year` int(11) NOT NULL,
  `course_college` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `assigned_teacher` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `hours_week`, `course_year`, `course_college`, `semester`, `assigned_teacher`) VALUES
(1, 'Computer Programming', 5, 1, 1, 1, 1),
(4, 'University and I', 2, 1, 1, 2, NULL);

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
(1, 1, 1, 'master scheduler');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL DEFAULT 'user',
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `username`, `password`, `role`) VALUES
(1, 'Markkyu', '$2b$10$AvVCygLuYZtTnAp5zzH34eh9LIRDPWWetpQX1VHbYfLB.WeogD.8q', 'user'),
(2, 'Test2', '$2b$10$wN/a6nxFUH1wSNal/EVk7OYTbbrRXViOz2NK..u9c4tcqnd.HIIc.', 'user');

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
  `course_info` text NOT NULL,
  `class_group` int(11) NOT NULL,
  `year_sched` int(11) NOT NULL,
  `time_slot` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`time_slot`)),
  `semester_sched` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `course_info`, `class_group`, `year_sched`, `time_slot`, `semester_sched`) VALUES
(1, 'Programming', 1, 1, '[\"MONDAY_0\", \"WEDNESDAY_0\"]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `department` int(11) NOT NULL,
  `teacher_availability` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `first_name`, `last_name`, `department`, `teacher_availability`) VALUES
(1, 'Aldwin', 'Ilumin', 1, 'full'),
(2, 'Wish', 'Ilumin', 1, 'full'),
(3, 'Karen', 'Hermosa', 1, 'full'),
(4, 'Noelyn', 'Sebua', 1, 'full'),
(5, 'Ver', 'Abarquez', 2, 'full'),
(6, 'Aldwinaka', 'Bottomesa', 1, 'full'),
(7, 'Wishikola', 'Hamburguesa', 1, 'full'),
(8, 'Kaiju', 'No. 9', 1, 'full'),
(11, 'Jonathan', 'Villaruz', 1, ''),
(13, 'Dennis', 'Chumacera', 2, ''),
(18, 'Ma Nhaidel', 'Salud', 6, ''),
(21, 'Lolo', 'Darling', 1, '');

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
  ADD PRIMARY KEY (`course_id`);

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
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `college_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
