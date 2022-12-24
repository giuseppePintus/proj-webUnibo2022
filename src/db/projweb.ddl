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
     userid char(1) not null,
     useremail char(1) not null,
     password char(1) not null,
     name char(1) not null,
     active char(1) not null,
     constraint IDUSER primary key (userid));

create table COMMENT (
     commentid char(1) not null,
     commenttext char(1) not null,
     postid char(1) not null,
     userid char(1) not null,
     constraint IDCOMMENT primary key (commentid));

create table CATEGORY (
     categoryid char(1) not null,
     categoryname char(1) not null,
     constraint IDCATEGORY primary key (categoryid));

create table following (
     followingid char(1) not null,
     userid char(1) not null,
     constraint IDfollowing primary key (followingid));

create table follower (
     followerid char(1) not null,
     userid char(1) not null,
     constraint IDfollower primary key (followerid));

create table POST (
     postid char(1) not null,
     posttitle char(1) not null,
     posttext char(1) not null,
     postdate char(1) not null,
     postpreview char(1) not null,
     postimage char(1) not null,
     userid char(1) not null,
     constraint IDPOST primary key (postid));

create table post_category (
     categoryid char(1) not null,
     postid char(1) not null,
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

