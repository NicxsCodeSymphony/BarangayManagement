-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2024 at 06:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barangaymanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `barangay_info`
--

CREATE TABLE `barangay_info` (
  `barangay_id` int(11) NOT NULL,
  `barangay_name` varchar(255) NOT NULL,
  `municipality` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `number` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangay_info`
--

INSERT INTO `barangay_info` (`barangay_id`, `barangay_name`, `municipality`, `province`, `number`, `email`, `image`, `time`) VALUES
(2, 'Gairan', 'Bogo City', 'Cebu', '09138172', 'adfjkl@gmail.com', 'uploads/logo.png', '2024-09-11 15:17:10');

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `residents_id` int(11) NOT NULL,
  `position` varchar(50) DEFAULT NULL,
  `position_type` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `relationship` enum('Mother','Father','Child','Other') NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `birth_date` date NOT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `civil_status` enum('Single','Married','Divorced','Widowed','Other') DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `occupation` varchar(50) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `pwd_status` enum('Yes','No') DEFAULT NULL,
  `pwd_id_no` varchar(50) DEFAULT NULL,
  `education` varchar(50) DEFAULT NULL,
  `purok` varchar(50) DEFAULT NULL,
  `barangay` varchar(50) DEFAULT NULL,
  `senior_citizen` enum('Yes','No') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`residents_id`, `position`, `position_type`, `first_name`, `middle_name`, `last_name`, `suffix`, `relationship`, `gender`, `birth_date`, `birth_place`, `age`, `civil_status`, `nationality`, `religion`, `occupation`, `contact`, `pwd_status`, `pwd_id_no`, `education`, `purok`, `barangay`, `senior_citizen`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'regular', '', 'John Nico', 'Mirnday', 'Edisan', 'None', 'Child', 'Male', '2024-09-11', 'Bogo City, Cebu', 22, 'Single', 'Filipino', 'Roman Catholic', 'Student', '09128398', 'No', '', 'IT Student', 'Diamond', 'Bungtod', 'No', 'uploads/residents/1724803608635.jpg', 'Active', '2024-09-15 12:41:39', '2024-09-15 12:41:39'),
(6, 'Official', 'Captain', 'Jolina', 'Sopsop', 'Escultor', 'None', 'Child', 'Female', '2024-07-25', 'Masbate', 21, 'Single', 'Filipino', 'Roman Catholic', 'Student', '09128398', 'No', '', 'IT Student', 'Diamond', 'Masmas', 'No', 'uploads/officials/inspector.png', 'Active', '2024-09-15 12:52:05', '2024-09-15 14:19:41'),
(8, 'Official', 'Secretary', 'Dhaniel', 'Lapa', 'Malinao', 'None', 'Father', 'Male', '2002-02-26', 'Bogo City, Cebu', 22, 'Single', 'Filipino', 'Roman Catholic', 'Student', '09128398', 'No', '', 'IT Student', 'Area', 'Pelaez', 'No', 'uploads/officials/inspector.png', 'Active', '2024-09-15 13:32:46', '2024-09-15 13:32:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barangay_info`
--
ALTER TABLE `barangay_info`
  ADD PRIMARY KEY (`barangay_id`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`residents_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barangay_info`
--
ALTER TABLE `barangay_info`
  MODIFY `barangay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `residents_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
