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


-- --------------------------------------------------------

--
-- Struttura della tabella `LIKED`
--

CREATE TABLE `LIKED` (
  `postid` bigint(20) NOT NULL,
  `userid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


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

-- --------------------------------------------------------

--
-- Struttura della tabella `OTHERUSER`
--

CREATE TABLE `OTHERUSER` (
  `userid` bigint(20) NOT NULL,
  `fol_userid` bigint(20) NOT NULL
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
