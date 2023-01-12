-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Gen 12, 2023 alle 17:54
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TachyonDB`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `CATEGORY`
--

CREATE TABLE `CATEGORY` (
  `categoryid` bigint(20) NOT NULL,
  `categoryname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `COMMENTCOMMENT`
--

CREATE TABLE `COMMENTCOMMENT` (
  `commentid` bigint(20) NOT NULL,
  `commenttext` varchar(100) NOT NULL,
  `commentdate` date NOT NULL,
  `userid` bigint(20) NOT NULL,
  `R_commentid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `COMMENTPOST`
--

CREATE TABLE `COMMENTPOST` (
  `commentid` bigint(20) NOT NULL,
  `commenttext` varchar(100) NOT NULL,
  `commentdate` date NOT NULL,
  `Com_userid` bigint(20) NOT NULL,
  `postid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `COMMENTPOST`
--

INSERT INTO `COMMENTPOST` (`commentid`, `commenttext`, `commentdate`, `Com_userid`, `postid`) VALUES
(1, 'dfd', '2022-12-31', 0, 3),
(2, 'ytjty', '2022-12-31', 0, 3),
(3, '1', '2022-12-31', 0, 4),
(4, '2', '2022-12-31', 0, 4),
(5, 's', '2022-12-31', 0, 4),
(6, 'ssvfd', '2022-12-31', 0, 4),
(7, 'ma asbdas', '2022-12-31', 0, 4),
(8, 'trhth', '2022-12-31', 0, 4),
(9, 'd', '2022-12-31', 0, 4),
(10, 'asd', '2022-12-31', 0, 4),
(11, 'asd', '2022-12-31', 0, 4),
(12, ';;ll', '2023-01-06', 0, 5),
(13, ';', '2023-01-08', 0, 1),
(14, ';', '2023-01-08', 0, 1),
(15, ';', '2023-01-08', 0, 1),
(16, ';', '2023-01-08', 0, 1),
(17, ';787', '2023-01-08', 0, 1),
(18, ';787', '2023-01-08', 0, 1),
(19, ';787', '2023-01-08', 0, 1),
(20, ';787', '2023-01-08', 0, 1),
(21, 'kn', '2023-01-08', 0, 5),
(22, 'kn', '2023-01-08', 0, 5),
(23, 'kn', '2023-01-08', 0, 5),
(24, 'kn', '2023-01-08', 0, 5),
(25, 'kn', '2023-01-08', 0, 5),
(26, 'kn', '2023-01-08', 0, 5),
(27, 'kn', '2023-01-08', 0, 5),
(28, 'kn', '2023-01-08', 0, 5),
(29, 'kn', '2023-01-08', 0, 5),
(30, 'kn', '2023-01-08', 0, 5),
(31, 'kn', '2023-01-08', 0, 5),
(32, 'kn', '2023-01-08', 0, 5),
(33, 'kn', '2023-01-08', 0, 5),
(34, 'sadsa', '2023-01-08', 0, 6),
(35, 'sadsa', '2023-01-08', 0, 6),
(36, 'sadsa', '2023-01-08', 0, 6),
(37, 'sadsa', '2023-01-08', 0, 6),
(38, 's', '2023-01-08', 0, 5),
(39, 's', '2023-01-08', 0, 5),
(40, '123', '2023-01-09', 0, 5),
(41, '123213', '2023-01-09', 0, 5),
(42, 'dsfdsfs', '2023-01-09', 0, 5),
(43, 'hehe', '2023-01-09', 4, 8),
(44, 'wqewqe', '2023-01-10', 4, 7),
(45, 'sdsa', '2023-01-10', 0, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `LIKED`
--

CREATE TABLE `LIKED` (
  `postid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `LIKED`
--

INSERT INTO `LIKED` (`postid`, `userid`) VALUES
(3, 0),
(4, 0),
(5, 4),
(6, 0),
(7, 0),
(7, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `LOGIN_ATTEMPTS`
--

CREATE TABLE `LOGIN_ATTEMPTS` (
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `NOTIFICATION`
--

CREATE TABLE `NOTIFICATION` (
  `notificationid` bigint(20) NOT NULL,
  `notificationtext` varchar(100) NOT NULL,
  `notificationdate` date NOT NULL,
  `alreadyread` char(1) NOT NULL,
  `to_userid` bigint(20) NOT NULL,
  `from_userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `NOTIFICATION`
--

INSERT INTO `NOTIFICATION` (`notificationid`, `notificationtext`, `notificationdate`, `alreadyread`, `to_userid`, `from_userid`) VALUES
(28, ' has liked your post', '2022-12-31', '1', 0, 0),
(29, ' has unliked it', '2022-12-31', '1', 0, 0),
(30, ' has commented your post', '2022-12-31', '1', 0, 0),
(31, ' has liked your post', '2022-12-31', '1', 0, 0),
(32, ' has unliked it', '2022-12-31', '1', 0, 0),
(33, ' has liked your post', '2022-12-31', '1', 0, 0),
(34, ' has unliked it', '2022-12-31', '1', 0, 0),
(35, ' has commented your post', '2022-12-31', '1', 0, 0),
(36, ' has liked your post', '2022-12-31', '1', 0, 0),
(37, ' has commented your post', '2022-12-31', '1', 0, 0),
(38, ' has commented your post', '2022-12-31', '1', 0, 0),
(39, ' has commented your post', '2022-12-31', '1', 0, 0),
(40, ' has unliked it', '2022-12-31', '1', 0, 0),
(41, ' has liked your post', '2022-12-31', '1', 0, 0),
(42, ' has unliked it', '2022-12-31', '1', 0, 0),
(43, ' has liked your post', '2022-12-31', '1', 0, 0),
(44, ' has unliked it', '2022-12-31', '1', 0, 0),
(45, ' has liked your post', '2023-01-05', '1', 0, 0),
(46, ' has unliked it', '2023-01-05', '1', 0, 0),
(47, ' has liked your post', '2023-01-05', '1', 0, 0),
(48, ' has unliked it', '2023-01-05', '1', 0, 0),
(49, ' has liked your post', '2023-01-05', '1', 0, 0),
(50, ' has unliked it', '2023-01-05', '1', 0, 0),
(51, ' has liked your post', '2023-01-05', '1', 0, 0),
(52, ' has unliked it', '2023-01-05', '1', 0, 0),
(53, ' has liked your post', '2023-01-05', '1', 0, 0),
(54, ' has unliked it', '2023-01-05', '1', 0, 0),
(55, ' has liked your post', '2023-01-05', '1', 0, 0),
(56, ' has unliked it', '2023-01-05', '1', 0, 0),
(57, ' has liked your post', '2023-01-06', '1', 0, 0),
(58, ' has unliked it', '2023-01-06', '1', 0, 0),
(59, ' has liked your post', '2023-01-06', '1', 0, 0),
(60, ' has unliked it', '2023-01-06', '1', 0, 0),
(61, ' has commented your post', '2023-01-06', '1', 0, 0),
(62, ' has liked your post', '2023-01-07', '0', 3, 0),
(63, ' has liked your post', '2023-01-07', '1', 0, 0),
(64, ' has liked your post', '2023-01-07', '0', 2, 0),
(65, ' has liked your post', '2023-01-07', '1', 0, 0),
(66, ' has unliked it', '2023-01-07', '1', 0, 0),
(67, ' has liked your post', '2023-01-07', '1', 0, 0),
(68, ' has unliked it', '2023-01-07', '1', 0, 0),
(69, ' has liked your post', '2023-01-07', '1', 0, 0),
(70, ' has unliked it', '2023-01-07', '1', 0, 0),
(71, ' has unliked it', '2023-01-07', '1', 0, 0),
(72, ' has liked your post', '2023-01-07', '1', 0, 0),
(73, ' has liked your post', '2023-01-07', '1', 0, 0),
(74, ' has unliked it', '2023-01-07', '1', 0, 0),
(75, ' has unliked it', '2023-01-07', '1', 0, 0),
(76, ' has liked your post', '2023-01-07', '1', 0, 0),
(77, ' has unliked it', '2023-01-07', '0', 3, 0),
(78, ' has liked your post', '2023-01-07', '0', 3, 0),
(79, ' has unliked it', '2023-01-07', '0', 3, 0),
(80, ' has liked your post', '2023-01-07', '0', 3, 0),
(81, ' has unliked it', '2023-01-07', '0', 3, 0),
(82, ' has liked your post', '2023-01-07', '0', 3, 0),
(83, ' has unliked it', '2023-01-07', '0', 3, 0),
(84, ' has liked your post', '2023-01-07', '0', 3, 0),
(85, ' has unliked it', '2023-01-07', '0', 2, 0),
(86, ' has liked your post', '2023-01-07', '0', 2, 0),
(87, ' has unliked it', '2023-01-07', '0', 2, 0),
(88, ' has liked your post', '2023-01-07', '0', 2, 0),
(89, ' has unliked it', '2023-01-07', '0', 3, 0),
(90, ' has liked your post', '2023-01-07', '0', 3, 0),
(91, ' has commented your post', '2023-01-08', '1', 0, 0),
(92, ' has commented your post', '2023-01-08', '1', 0, 0),
(93, ' has commented your post', '2023-01-08', '1', 0, 0),
(94, ' has commented your post', '2023-01-08', '1', 0, 0),
(95, ' has commented your post', '2023-01-08', '1', 0, 0),
(96, ' has commented your post', '2023-01-08', '1', 0, 0),
(97, ' has commented your post', '2023-01-08', '1', 0, 0),
(98, ' has commented your post', '2023-01-08', '1', 0, 0),
(99, ' has commented your post', '2023-01-08', '1', 0, 0),
(100, ' has commented your post', '2023-01-08', '1', 0, 0),
(101, ' has commented your post', '2023-01-08', '1', 0, 0),
(102, ' has commented your post', '2023-01-08', '1', 0, 0),
(103, ' has commented your post', '2023-01-08', '1', 0, 0),
(104, ' has commented your post', '2023-01-08', '1', 0, 0),
(105, ' has commented your post', '2023-01-08', '1', 0, 0),
(106, ' has commented your post', '2023-01-08', '1', 0, 0),
(107, ' has commented your post', '2023-01-08', '1', 0, 0),
(108, ' has commented your post', '2023-01-08', '1', 0, 0),
(109, ' has commented your post', '2023-01-08', '1', 0, 0),
(110, ' has commented your post', '2023-01-08', '1', 0, 0),
(111, ' has commented your post', '2023-01-08', '1', 0, 0),
(112, ' has unliked it', '2023-01-08', '1', 0, 0),
(113, ' has liked your post', '2023-01-08', '1', 0, 0),
(114, ' has unliked it', '2023-01-08', '1', 0, 0),
(115, ' has liked your post', '2023-01-08', '1', 0, 0),
(116, ' has unliked it', '2023-01-08', '0', 2, 0),
(117, ' has liked your post', '2023-01-08', '0', 2, 0),
(118, ' has commented your post', '2023-01-08', '0', 2, 0),
(119, ' has commented your post', '2023-01-08', '0', 2, 0),
(120, ' has commented your post', '2023-01-08', '0', 2, 0),
(121, ' has commented your post', '2023-01-08', '0', 2, 0),
(122, ' has liked your post', '2023-01-08', '1', 0, 0),
(123, ' has unliked it', '2023-01-08', '1', 0, 0),
(124, ' has liked your post', '2023-01-08', '1', 0, 0),
(125, ' has unliked it', '2023-01-08', '1', 0, 0),
(126, ' has commented your post', '2023-01-08', '1', 0, 0),
(127, ' has commented your post', '2023-01-08', '1', 0, 0),
(128, ' has liked your post', '2023-01-08', '1', 0, 0),
(129, ' has unliked it', '2023-01-08', '1', 0, 0),
(130, ' has liked your post', '2023-01-09', '1', 0, 0),
(131, ' has unliked it', '2023-01-09', '1', 0, 0),
(132, ' has commented your post', '2023-01-09', '1', 0, 0),
(133, ' has commented your post', '2023-01-09', '1', 0, 0),
(134, ' has commented your post', '2023-01-09', '1', 0, 0),
(135, ' has liked your post', '2023-01-09', '1', 4, 4),
(136, ' has unliked it', '2023-01-09', '1', 4, 4),
(137, ' has liked your post', '2023-01-09', '1', 4, 4),
(138, ' has unliked it', '2023-01-09', '1', 4, 4),
(139, ' has liked your post', '2023-01-09', '1', 4, 4),
(140, ' has unliked it', '2023-01-09', '1', 4, 4),
(141, ' has liked your post', '2023-01-09', '1', 4, 4),
(142, ' has unliked it', '2023-01-09', '1', 4, 4),
(143, ' has liked your post', '2023-01-09', '1', 4, 4),
(144, ' has commented your post', '2023-01-09', '1', 4, 4),
(145, ' has liked your post', '2023-01-10', '0', 3, 4),
(146, ' has unliked it', '2023-01-10', '0', 3, 4),
(147, ' has liked your post', '2023-01-10', '0', 3, 4),
(148, ' has unliked it', '2023-01-10', '0', 3, 4),
(149, ' has liked your post', '2023-01-10', '0', 3, 4),
(150, ' has unliked it', '2023-01-10', '0', 3, 4),
(151, ' has liked your post', '2023-01-10', '0', 3, 4),
(152, ' has unliked it', '2023-01-10', '0', 3, 4),
(153, ' has commented your post', '2023-01-10', '0', 3, 4),
(154, ' has liked your post', '2023-01-10', '1', 0, 4),
(155, ' has liked your post', '2023-01-10', '1', 0, 4),
(156, ' has unliked it', '2023-01-10', '1', 4, 4),
(157, ' has liked your post', '2023-01-10', '1', 4, 4),
(158, ' has unliked it', '2023-01-10', '1', 0, 4),
(159, ' has liked your post', '2023-01-10', '1', 0, 4),
(160, ' has unliked it', '2023-01-10', '1', 0, 4),
(161, ' has liked your post', '2023-01-10', '1', 0, 0),
(162, ' has unliked it', '2023-01-10', '1', 0, 0),
(163, ' has liked your post', '2023-01-10', '1', 0, 0),
(164, ' has unliked it', '2023-01-10', '1', 4, 4),
(165, ' has liked your post', '2023-01-10', '1', 4, 4),
(166, ' has unliked it', '2023-01-10', '1', 4, 4),
(167, ' has liked your post', '2023-01-10', '1', 4, 4),
(168, ' has unliked it', '2023-01-10', '1', 4, 4),
(169, ' has liked your post', '2023-01-10', '1', 4, 4),
(170, ' has unliked it', '2023-01-10', '1', 4, 4),
(171, ' has liked your post', '2023-01-10', '1', 4, 4),
(172, ' has unliked it', '2023-01-10', '1', 4, 4),
(173, ' has unfollowed you!', '2023-01-10', '1', 0, 4),
(174, ' has started following you!', '2023-01-10', '1', 0, 4),
(175, ' has unfollowed you!', '2023-01-10', '1', 0, 4),
(176, ' has started following you!', '2023-01-10', '1', 0, 4),
(177, ' has unfollowed you!', '2023-01-10', '1', 0, 4),
(178, ' has started following you!', '2023-01-10', '0', 2, 4),
(179, ' has started following you!', '2023-01-10', '1', 4, 0),
(180, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(181, ' has started following you!', '2023-01-10', '1', 4, 0),
(182, ' has started following you!', '2023-01-10', '1', 0, 2),
(183, ' has liked your post', '2023-01-10', '1', 4, 0),
(184, ' has unliked it', '2023-01-10', '1', 4, 0),
(185, ' has liked your post', '2023-01-10', '1', 4, 0),
(186, ' has unliked it', '2023-01-10', '1', 4, 0),
(187, ' has liked your post', '2023-01-10', '1', 4, 0),
(188, ' has unliked it', '2023-01-10', '1', 4, 0),
(189, ' has liked your post', '2023-01-10', '1', 4, 0),
(190, ' has unliked it', '2023-01-10', '1', 4, 0),
(191, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(192, ' has started following you!', '2023-01-10', '1', 4, 0),
(193, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(194, ' has liked your post', '2023-01-10', '1', 4, 4),
(195, ' has unliked it', '2023-01-10', '1', 4, 4),
(196, ' has started following you!', '2023-01-10', '1', 4, 0),
(197, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(198, ' has started following you!', '2023-01-10', '1', 4, 0),
(199, ' has commented your post', '2023-01-10', '1', 4, 0),
(200, ' has unfollowed you!', '2023-01-10', '0', 2, 0),
(201, ' has started following you!', '2023-01-10', '0', 2, 0),
(202, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(203, ' has started following you!', '2023-01-10', '1', 4, 0),
(204, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(205, ' has started following you!', '2023-01-10', '1', 4, 0),
(206, ' has unfollowed you!', '2023-01-10', '1', 4, 0),
(207, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(208, ' has started following you!', '2023-01-10', '0', 2, 4),
(209, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(210, ' has started following you!', '2023-01-10', '0', 2, 4),
(211, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(212, ' has started following you!', '2023-01-10', '0', 2, 4),
(213, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(214, ' has started following you!', '2023-01-10', '0', 2, 4),
(215, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(216, ' has started following you!', '2023-01-10', '0', 2, 4),
(217, ' has started following you!', '2023-01-10', '0', 3, 4),
(218, ' has unfollowed you!', '2023-01-10', '0', 3, 4),
(219, ' has started following you!', '2023-01-10', '0', 3, 4),
(220, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(221, ' has started following you!', '2023-01-10', '0', 2, 4),
(222, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(223, ' has started following you!', '2023-01-10', '0', 2, 4),
(224, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(225, ' has started following you!', '2023-01-10', '0', 2, 4),
(226, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(227, ' has started following you!', '2023-01-10', '0', 2, 4),
(228, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(229, ' has started following you!', '2023-01-10', '0', 2, 4),
(230, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(231, ' has started following you!', '2023-01-10', '0', 2, 4),
(232, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(233, ' has started following you!', '2023-01-10', '0', 2, 4),
(234, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(235, ' has started following you!', '2023-01-10', '0', 2, 4),
(236, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(237, ' has started following you!', '2023-01-10', '0', 2, 4),
(238, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(239, ' has started following you!', '2023-01-10', '0', 2, 4),
(240, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(241, ' has started following you!', '2023-01-10', '0', 2, 4),
(242, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(243, ' has started following you!', '2023-01-10', '0', 2, 4),
(244, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(245, ' has started following you!', '2023-01-10', '0', 2, 4),
(246, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(247, ' has started following you!', '2023-01-10', '0', 2, 4),
(248, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(249, ' has started following you!', '2023-01-10', '0', 2, 4),
(250, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(251, ' has started following you!', '2023-01-10', '0', 2, 4),
(252, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(253, ' has started following you!', '2023-01-10', '0', 2, 4),
(254, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(255, ' has started following you!', '2023-01-10', '0', 2, 4),
(256, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(257, ' has started following you!', '2023-01-10', '0', 2, 4),
(258, ' has started following you!', '2023-01-10', '0', 0, 4),
(259, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(260, ' has started following you!', '2023-01-10', '0', 2, 4),
(261, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(262, ' has started following you!', '2023-01-10', '0', 2, 4),
(263, ' has started following you!', '2023-01-10', '0', 0, 4),
(264, ' has started following you!', '2023-01-10', '0', 2, 4),
(265, ' has started following you!', '2023-01-10', '0', 3, 4),
(266, ' has unfollowed you!', '2023-01-10', '0', 2, 4),
(267, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(268, ' has started following you!', '2023-01-11', '0', 3, 4),
(269, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(270, ' has started following you!', '2023-01-11', '0', 3, 4),
(271, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(272, ' has started following you!', '2023-01-11', '0', 3, 4),
(273, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(274, ' has started following you!', '2023-01-11', '0', 3, 4),
(275, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(276, ' has started following you!', '2023-01-11', '0', 3, 4),
(277, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(278, ' has started following you!', '2023-01-11', '0', 3, 4),
(279, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(280, ' has started following you!', '2023-01-11', '0', 3, 4),
(281, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(282, ' has started following you!', '2023-01-11', '0', 3, 4),
(283, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(284, ' has started following you!', '2023-01-11', '0', 3, 4),
(285, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(286, ' has started following you!', '2023-01-11', '0', 3, 4),
(287, ' has unfollowed you!', '2023-01-11', '0', 3, 4),
(288, ' has started following you!', '2023-01-11', '0', 3, 4),
(289, ' has liked your post', '2023-01-11', '1', 4, 4),
(290, ' has unliked it', '2023-01-11', '1', 4, 4),
(291, ' has unliked it', '2023-01-11', '0', 0, 4),
(292, ' has liked your post', '2023-01-11', '0', 0, 4),
(293, ' has unliked it', '2023-01-11', '0', 0, 4),
(294, ' has liked your post', '2023-01-11', '0', 0, 4),
(295, ' has started following you!', '2023-01-11', '0', 2, 4),
(296, ' has unfollowed you!', '2023-01-11', '0', 2, 4),
(297, ' has unliked it', '2023-01-11', '0', 0, 4),
(298, ' has liked your post', '2023-01-11', '0', 0, 4),
(299, ' has unliked it', '2023-01-11', '0', 0, 4),
(300, ' has liked your post', '2023-01-11', '1', 4, 4),
(301, ' has unliked it', '2023-01-11', '1', 4, 4),
(302, ' has liked your post', '2023-01-11', '1', 4, 4),
(303, ' has unliked it', '2023-01-11', '1', 4, 4),
(304, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(305, ' has saved your post', '2023-01-11', '1', 4, 4),
(306, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(307, ' has saved your post', '2023-01-11', '0', 4, 4),
(308, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(309, ' has saved your post', '2023-01-11', '0', 4, 4),
(310, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(311, ' has saved your post', '2023-01-11', '0', 4, 4),
(312, ' has liked your post', '2023-01-11', '0', 0, 4),
(313, ' has unliked it', '2023-01-11', '0', 0, 4),
(314, ' has liked your post', '2023-01-11', '0', 0, 4),
(315, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(316, ' has saved your post', '2023-01-11', '0', 4, 4),
(317, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(318, ' has saved your post', '2023-01-11', '0', 4, 4),
(319, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(320, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(321, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(322, ' has saved your post', '2023-01-11', '0', 4, 4),
(323, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(324, ' has saved your post', '2023-01-11', '0', 4, 4),
(325, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(326, ' has saved your post', '2023-01-11', '0', 4, 4),
(327, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(328, ' has saved your post', '2023-01-11', '0', 4, 4),
(329, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(330, ' has saved your post', '2023-01-11', '0', 4, 4),
(331, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(332, ' has saved your post', '2023-01-11', '0', 4, 4),
(333, ' has saved your post', '2023-01-11', '1', 4, 4),
(334, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(335, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(336, ' has liked your post', '2023-01-11', '1', 4, 4),
(337, ' has unliked it', '2023-01-11', '1', 4, 4),
(338, ' has saved your post', '2023-01-11', '1', 4, 4),
(339, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(340, ' has saved your post', '2023-01-11', '1', 4, 4),
(341, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(342, ' has saved your post', '2023-01-11', '1', 4, 4),
(343, ' has saved your post', '2023-01-11', '1', 4, 4),
(344, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(345, ' has unsaved your post', '2023-01-11', '1', 4, 4),
(346, ' has saved your post', '2023-01-11', '0', 4, 4),
(347, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(348, ' has saved your post', '2023-01-11', '0', 4, 4),
(349, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(350, ' has saved your post', '2023-01-11', '0', 4, 4),
(351, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(352, ' has saved your post', '2023-01-11', '0', 4, 4),
(353, ' has unsaved your post', '2023-01-11', '0', 4, 4),
(354, ' has liked your post', '2023-01-11', '0', 4, 4),
(355, ' has unliked it', '2023-01-11', '0', 4, 4),
(356, ' has liked your post', '2023-01-11', '0', 4, 4),
(357, ' has unliked it', '2023-01-11', '0', 4, 4),
(358, ' has liked your post', '2023-01-11', '0', 4, 4),
(359, ' has unliked it', '2023-01-11', '0', 4, 4),
(360, ' has liked your post', '2023-01-11', '0', 4, 4),
(361, ' has unliked it', '2023-01-11', '0', 4, 4),
(362, ' has liked your post', '2023-01-11', '0', 4, 4),
(363, ' has unliked it', '2023-01-11', '0', 4, 4),
(364, ' has liked your post', '2023-01-11', '0', 4, 4),
(365, ' has unliked it', '2023-01-11', '0', 4, 4),
(366, ' has liked your post', '2023-01-11', '0', 4, 4),
(367, ' has unliked it', '2023-01-11', '0', 4, 4),
(368, ' has liked your post', '2023-01-11', '1', 4, 4),
(369, ' has unliked it', '2023-01-11', '1', 4, 4),
(370, ' has started following you!', '2023-01-11', '0', 0, 6),
(371, ' has started following you!', '2023-01-11', '0', 2, 6),
(372, ' has started following you!', '2023-01-11', '0', 3, 6),
(373, ' has liked your post', '2023-01-11', '1', 6, 6),
(374, ' has unliked it', '2023-01-11', '1', 6, 6),
(375, ' has liked your post', '2023-01-11', '1', 6, 6),
(376, ' has unliked it', '2023-01-11', '1', 6, 6),
(377, ' has liked your post', '2023-01-11', '1', 6, 6),
(378, ' has unliked it', '2023-01-11', '1', 6, 6),
(379, ' has liked your post', '2023-01-11', '1', 6, 6),
(380, ' has unliked it', '2023-01-11', '1', 6, 6),
(381, ' has liked your post', '2023-01-11', '1', 6, 6),
(382, ' has unliked it', '2023-01-11', '1', 6, 6),
(383, ' has liked your post', '2023-01-11', '1', 6, 6),
(384, ' has unliked it', '2023-01-11', '1', 6, 6),
(385, ' has liked your post', '2023-01-11', '1', 6, 6),
(386, ' has unliked it', '2023-01-11', '1', 6, 6),
(387, ' has liked your post', '2023-01-11', '1', 6, 6),
(388, ' has unliked it', '2023-01-11', '1', 6, 6),
(389, ' has liked your post', '2023-01-11', '1', 6, 6),
(390, ' has unliked it', '2023-01-11', '1', 6, 6),
(391, ' has liked your post', '2023-01-11', '1', 6, 6),
(392, ' has unliked it', '2023-01-11', '1', 6, 6),
(393, ' has liked your post', '2023-01-11', '1', 6, 6),
(394, ' has unliked it', '2023-01-11', '1', 6, 6),
(395, ' has liked your post', '2023-01-11', '1', 6, 6),
(396, ' has unliked it', '2023-01-11', '1', 6, 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `OTHERUSER`
--

CREATE TABLE `OTHERUSER` (
  `userid` bigint(20) NOT NULL,
  `fol_userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `OTHERUSER`
--

INSERT INTO `OTHERUSER` (`userid`, `fol_userid`) VALUES
(2, 3),
(0, 3),
(0, 2),
(4, 0),
(4, 3),
(6, 0),
(6, 2),
(6, 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `POST`
--

CREATE TABLE `POST` (
  `postid` bigint(20) NOT NULL,
  `posttext` varchar(100) NOT NULL,
  `postdate` date NOT NULL,
  `postimage` varchar(100) DEFAULT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `POST`
--

INSERT INTO `POST` (`postid`, `posttext`, `postdate`, `postimage`, `userid`) VALUES
(1, 'tghrhr', '2022-12-26', NULL, 0),
(2, 'tgbf', '2022-12-21', NULL, 0),
(3, 'asdsadasdas', '2022-12-31', NULL, 0),
(4, '111', '2022-12-31', NULL, 0),
(5, 'dsfdsfds', '2023-01-05', NULL, 0),
(6, 'efefewf', '2022-12-26', NULL, 2),
(7, 'asdsadsa', '2022-12-01', NULL, 3),
(8, 'assas', '2023-01-09', NULL, 4),
(9, 'hhhg', '2023-01-11', NULL, 5),
(10, 'wefwefewe', '2023-01-11', NULL, 5),
(11, 'dfdf', '2023-01-11', './upload/sss/e23d0121-796c-4b21-8965-422f7d55d6ce.jpeg', 5),
(12, 'dvsd', '2023-01-11', './upload/sss/e23d0121-796c-4b21-8965-422f7d55d6ce.jpeg', 5),
(13, 'hehe', '2023-01-11', './upload/aaa/e23d0121-796c-4b21-8965-422f7d55d6ce.jpeg', 6),
(14, 's', '2023-01-11', NULL, 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `POSTCATEGORY`
--

CREATE TABLE `POSTCATEGORY` (
  `categoryid` bigint(20) NOT NULL,
  `postid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `SAVED`
--

CREATE TABLE `SAVED` (
  `postid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `SAVED`
--

INSERT INTO `SAVED` (`postid`, `userid`) VALUES
(14, 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `SHARED`
--

CREATE TABLE `SHARED` (
  `postid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `USER_CREDENTIAL`
--

CREATE TABLE `USER_CREDENTIAL` (
  `userid` bigint(20) NOT NULL,
  `useremail` varchar(100) NOT NULL,
  `passwordhash` varchar(100) NOT NULL,
  `active` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `USER_CREDENTIAL`
--

INSERT INTO `USER_CREDENTIAL` (`userid`, `useremail`, `passwordhash`, `active`) VALUES
(0, '123.23', '8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61', '1'),
(2, 'r3232f', '32f232', '1'),
(3, 'sadasv', 'vsdvdvsdvsd', '1'),
(4, 'song', '63f75c890b05405e6e1f047072642b40949dab5912aa9c0ae6f2e654dff943dd', '1'),
(5, 'sss', 'a871c47a7f48a12b38a994e48a9659fab5d6376f3dbce37559bcb617efe8662d', '1'),
(6, 'aaa', '9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f0', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `USER_PROFILE`
--

CREATE TABLE `USER_PROFILE` (
  `userid` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `usernickname` varchar(100) NOT NULL,
  `usericon` varchar(100) NOT NULL,
  `userbiography` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `USER_PROFILE`
--

INSERT INTO `USER_PROFILE` (`userid`, `username`, `usernickname`, `usericon`, `userbiography`) VALUES
(0, 'giubby', 'Pintus', './upload/giubby/e23d0121-796c-4b21-8965-422f7d55d6ce_3.jpeg', 'hehehehe1'),
(2, 'wqqwq', 'fqwfq', 'upload/giubby/icon.jpg', 'sdsadas'),
(3, 'hehe123', '213123', 'upload/giubby/icon.jpg', '1e2e2d'),
(4, 'song', 'song', './upload/song/e23d0121-796c-4b21-8965-422f7d55d6ce.jpeg', 'sdsadasasd'),
(5, 'sss', 'hehe', './upload/sss/01d3d181-965b-463c-b4fc-fa8a3bb0fe82.jpeg', 'hehehe'),
(6, 'aaa', 'aaa', './upload/aaa/01d3d181-965b-463c-b4fc-fa8a3bb0fe82.jpeg', 'bf');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `CATEGORY`
--
ALTER TABLE `CATEGORY`
  ADD PRIMARY KEY (`categoryid`);

--
-- Indici per le tabelle `COMMENTCOMMENT`
--
ALTER TABLE `COMMENTCOMMENT`
  ADD PRIMARY KEY (`commentid`),
  ADD KEY `FKcommentedcomment` (`userid`),
  ADD KEY `FKR` (`R_commentid`);

--
-- Indici per le tabelle `COMMENTPOST`
--
ALTER TABLE `COMMENTPOST`
  ADD PRIMARY KEY (`commentid`),
  ADD KEY `FKcommented` (`Com_userid`),
  ADD KEY `FKbecommented` (`postid`);

--
-- Indici per le tabelle `LIKED`
--
ALTER TABLE `LIKED`
  ADD PRIMARY KEY (`postid`,`userid`),
  ADD KEY `FKLIK_USE` (`userid`);

--
-- Indici per le tabelle `LOGIN_ATTEMPTS`
--
ALTER TABLE `LOGIN_ATTEMPTS`
  ADD PRIMARY KEY (`time`),
  ADD KEY `FKR00` (`userid`);

--
-- Indici per le tabelle `NOTIFICATION`
--
ALTER TABLE `NOTIFICATION`
  ADD PRIMARY KEY (`notificationid`),
  ADD KEY `FKR_101` (`to_userid`),
  ADD KEY `FKR_100` (`from_userid`);

--
-- Indici per le tabelle `OTHERUSER`
--
ALTER TABLE `OTHERUSER`
  ADD KEY `FKfollower` (`userid`),
  ADD KEY `FKfollowing` (`fol_userid`);

--
-- Indici per le tabelle `POST`
--
ALTER TABLE `POST`
  ADD PRIMARY KEY (`postid`),
  ADD KEY `FKusersendpost` (`userid`);

--
-- Indici per le tabelle `POSTCATEGORY`
--
ALTER TABLE `POSTCATEGORY`
  ADD PRIMARY KEY (`categoryid`,`postid`),
  ADD KEY `FKbel_POS` (`postid`);

--
-- Indici per le tabelle `SAVED`
--
ALTER TABLE `SAVED`
  ADD PRIMARY KEY (`postid`,`userid`),
  ADD KEY `FKSAV_USE` (`userid`);

--
-- Indici per le tabelle `SHARED`
--
ALTER TABLE `SHARED`
  ADD PRIMARY KEY (`postid`,`userid`),
  ADD KEY `FKSHA_USE` (`userid`);

--
-- Indici per le tabelle `USER_CREDENTIAL`
--
ALTER TABLE `USER_CREDENTIAL`
  ADD PRIMARY KEY (`userid`);

--
-- Indici per le tabelle `USER_PROFILE`
--
ALTER TABLE `USER_PROFILE`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `FKassociate_ID` (`userid`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `CATEGORY`
--
ALTER TABLE `CATEGORY`
  MODIFY `categoryid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `COMMENTCOMMENT`
--
ALTER TABLE `COMMENTCOMMENT`
  MODIFY `commentid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `COMMENTPOST`
--
ALTER TABLE `COMMENTPOST`
  MODIFY `commentid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT per la tabella `NOTIFICATION`
--
ALTER TABLE `NOTIFICATION`
  MODIFY `notificationid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=397;

--
-- AUTO_INCREMENT per la tabella `POST`
--
ALTER TABLE `POST`
  MODIFY `postid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `USER_CREDENTIAL`
--
ALTER TABLE `USER_CREDENTIAL`
  MODIFY `userid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `COMMENTCOMMENT`
--
ALTER TABLE `COMMENTCOMMENT`
  ADD CONSTRAINT `FKR` FOREIGN KEY (`R_commentid`) REFERENCES `COMMENTPOST` (`commentid`),
  ADD CONSTRAINT `FKcommentedcomment` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `COMMENTPOST`
--
ALTER TABLE `COMMENTPOST`
  ADD CONSTRAINT `FKbecommented` FOREIGN KEY (`postid`) REFERENCES `POST` (`postid`),
  ADD CONSTRAINT `FKcommented` FOREIGN KEY (`Com_userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `LIKED`
--
ALTER TABLE `LIKED`
  ADD CONSTRAINT `FKLIK_POS` FOREIGN KEY (`postid`) REFERENCES `POST` (`postid`),
  ADD CONSTRAINT `FKLIK_USE` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `LOGIN_ATTEMPTS`
--
ALTER TABLE `LOGIN_ATTEMPTS`
  ADD CONSTRAINT `FKR00` FOREIGN KEY (`userid`) REFERENCES `USER_CREDENTIAL` (`userid`);

--
-- Limiti per la tabella `NOTIFICATION`
--
ALTER TABLE `NOTIFICATION`
  ADD CONSTRAINT `FKR_100` FOREIGN KEY (`from_userid`) REFERENCES `USER_PROFILE` (`userid`),
  ADD CONSTRAINT `FKR_101` FOREIGN KEY (`to_userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `OTHERUSER`
--
ALTER TABLE `OTHERUSER`
  ADD CONSTRAINT `FKfollower` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`),
  ADD CONSTRAINT `FKfollowing` FOREIGN KEY (`fol_userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `POST`
--
ALTER TABLE `POST`
  ADD CONSTRAINT `FKusersendpost` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `POSTCATEGORY`
--
ALTER TABLE `POSTCATEGORY`
  ADD CONSTRAINT `FKbel_CAT` FOREIGN KEY (`categoryid`) REFERENCES `CATEGORY` (`categoryid`),
  ADD CONSTRAINT `FKbel_POS` FOREIGN KEY (`postid`) REFERENCES `POST` (`postid`);

--
-- Limiti per la tabella `SAVED`
--
ALTER TABLE `SAVED`
  ADD CONSTRAINT `FKSAV_POS` FOREIGN KEY (`postid`) REFERENCES `POST` (`postid`),
  ADD CONSTRAINT `FKSAV_USE` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `SHARED`
--
ALTER TABLE `SHARED`
  ADD CONSTRAINT `FKSHA_POS` FOREIGN KEY (`postid`) REFERENCES `POST` (`postid`),
  ADD CONSTRAINT `FKSHA_USE` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `USER_PROFILE`
--
ALTER TABLE `USER_PROFILE`
  ADD CONSTRAINT `FKassociate_FK` FOREIGN KEY (`userid`) REFERENCES `USER_CREDENTIAL` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
