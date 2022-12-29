-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Dic 29, 2022 alle 15:54
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

drop database if EXISTS `TachyonDB`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `TachyonDB`;  
use `TachyonDB`;
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
  `userid` bigint(20) NOT NULL,
  `Com_userid` bigint(20) NOT NULL,
  `postid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `FOLLOWER`
--

CREATE TABLE `FOLLOWER` (
  `followerid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `FOLLOWING`
--

CREATE TABLE `FOLLOWING` (
  `followingid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 0),
(3, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `NOTIFICATION`
--

CREATE TABLE `NOTIFICATION` (
  `notificationid` bigint(20) NOT NULL,
  `notificationtext` varchar(100) NOT NULL,
  `notificationdate` date NOT NULL,
  `alreadyread` char(1) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, '456165', '2022-12-28', NULL, 0),
(2, 'asdsadasdas', '2022-12-28', 'upload/giubby/01d3d181-965b-463c-b4fc-fa8a3bb0fe82.jpeg', 0),
(3, 'dfgfdgdfdfgdfg', '2022-12-28', NULL, 0),
(4, 'asfasfasfas', '2022-12-28', 'upload/giubby/img.png', 0);

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
(0, '123@123.com', '123', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `USER_PROFILE`
--

CREATE TABLE `USER_PROFILE` (
  `userid` bigint(20) NOT NULL,
  `Ass_userid` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `usernickname` varchar(100) NOT NULL,
  `usericon` varchar(100) NOT NULL,
  `userbiography` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `USER_PROFILE`
--

INSERT INTO `USER_PROFILE` (`userid`, `Ass_userid`, `username`, `usernickname`, `usericon`, `userbiography`) VALUES
(0, 0, 'giubby', 'Giuseppe Pintus', 'upload/giubby/icon.jpg', 'sono un idiota');

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
-- Indici per le tabelle `FOLLOWER`
--
ALTER TABLE `FOLLOWER`
  ADD PRIMARY KEY (`followerid`),
  ADD KEY `FKhasfollower` (`userid`);

--
-- Indici per le tabelle `FOLLOWING`
--
ALTER TABLE `FOLLOWING`
  ADD PRIMARY KEY (`followingid`),
  ADD KEY `FKhasfollowing` (`userid`);

--
-- Indici per le tabelle `LIKED`
--
ALTER TABLE `LIKED`
  ADD PRIMARY KEY (`postid`,`userid`),
  ADD KEY `FKLIK_USE` (`userid`);

--
-- Indici per le tabelle `NOTIFICATION`
--
ALTER TABLE `NOTIFICATION`
  ADD PRIMARY KEY (`notificationid`),
  ADD KEY `FKnotify` (`userid`);

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
  ADD UNIQUE KEY `FKassociate_ID` (`Ass_userid`);

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
  MODIFY `commentid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `FOLLOWER`
--
ALTER TABLE `FOLLOWER`
  MODIFY `followerid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `FOLLOWING`
--
ALTER TABLE `FOLLOWING`
  MODIFY `followingid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `NOTIFICATION`
--
ALTER TABLE `NOTIFICATION`
  MODIFY `notificationid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `POST`
--
ALTER TABLE `POST`
  MODIFY `postid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `POSTCATEGORY`
--
ALTER TABLE `POSTCATEGORY`
  MODIFY `categoryid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `USER_CREDENTIAL`
--
ALTER TABLE `USER_CREDENTIAL`
  MODIFY `userid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `USER_PROFILE`
--
ALTER TABLE `USER_PROFILE`
  MODIFY `userid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Limiti per la tabella `FOLLOWER`
--
ALTER TABLE `FOLLOWER`
  ADD CONSTRAINT `FKhasfollower` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `FOLLOWING`
--
ALTER TABLE `FOLLOWING`
  ADD CONSTRAINT `FKhasfollowing` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `LIKED`
--
ALTER TABLE `LIKED`
  ADD CONSTRAINT `FKLIK_POS` FOREIGN KEY (`postid`) REFERENCES `POST` (`postid`),
  ADD CONSTRAINT `FKLIK_USE` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

--
-- Limiti per la tabella `NOTIFICATION`
--
ALTER TABLE `NOTIFICATION`
  ADD CONSTRAINT `FKnotify` FOREIGN KEY (`userid`) REFERENCES `USER_PROFILE` (`userid`);

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
  ADD CONSTRAINT `FKassociate_FK` FOREIGN KEY (`Ass_userid`) REFERENCES `USER_CREDENTIAL` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
