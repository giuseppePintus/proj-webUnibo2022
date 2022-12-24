-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 20 2021              
-- * Generation date: Sat Dec 24 18:36:27 2022 
-- * LUN file: /home/zaks/university_projects/proj-webUnibo2022/projweb.lun 
-- * Schema: socialMediaReddit/1-1-1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database socialMediaReddit;
use socialMediaReddit;


-- Tables Section
-- _____________ 

create table USER (
     userid int not null AUTO_INCREMENT,
     useremail varchar(100) not null,
     password varchar(100) not null,
     name varchar(100) not null,
     active char(1) not null,
     constraint IDUSER primary key (userid));

create table COMMENT (
     commentid int not null AUTO_INCREMENT,
     commenttext varchar(100) not null,
     postid int not null,
     userid int not null,
     constraint IDCOMMENT primary key (commentid));

create table CATEGORY (
     categoryid int not null AUTO_INCREMENT,
     categoryname varchar(100) not null,
     constraint IDCATEGORY primary key (categoryid));

create table following (
     followingid int not null AUTO_INCREMENT,
     userid int not null,
     constraint IDfollowing primary key (followingid));

create table follower (
     followerid int not null AUTO_INCREMENT,
     userid int not null,
     constraint IDfollower primary key (followerid));

create table POST (
     postid int not null AUTO_INCREMENT,
     posttitle varchar(100) not null,
     posttext varchar(100) not null,
     postdate date not null,
     postpreview varchar(100) not null,
     postimage blob not null,
     userid int not null,
     constraint IDPOST primary key (postid));

create table post_category (
     categoryid int not null AUTO_INCREMENT,
     postid int not null,
     constraint IDpost_category primary key (categoryid, postid));


-- Constraints Section
-- ___________________ 

alter table COMMENT add constraint FKR_3
     foreign key (postid)
     references POST (postid);

alter table COMMENT add constraint FKR_2
     foreign key (userid)
     references USER (userid);

alter table following add constraint FKR_4
     foreign key (userid)
     references USER (userid);

alter table follower add constraint FKR_5
     foreign key (userid)
     references USER (userid);

alter table POST add constraint FKR
     foreign key (userid)
     references USER (userid);

alter table post_category add constraint FKpos_POS
     foreign key (postid)
     references POST (postid);

alter table post_category add constraint FKpos_CAT
     foreign key (categoryid)
     references CATEGORY (categoryid);


-- Index Section
-- _____________ 

