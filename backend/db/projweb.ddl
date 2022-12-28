-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 20 2021              
-- * Generation date: Wed Dec 28 22:02:15 2022 
-- * LUN file: /home/zaks/university_projects/proj-webUnibo2022/projweb.lun 
-- * Schema: TachyonDB/1-1-1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database TachyonDB;
use TachyonDB;


-- Tables Section
-- _____________ 

create table POSTCATEGORY (
     categoryid bigint not null AUTO_INCREMENT,
     postid bigint not null,
     constraint IDbelongsto primary key (categoryid, postid));

create table CATEGORY (
     categoryid bigint not null AUTO_INCREMENT,
     categoryname varchar(100) not null,
     constraint IDCATEGORY primary key (categoryid));

create table COMMENTCOMMENT (
     commentid bigint not null AUTO_INCREMENT,
     commenttext varchar(100) not null,
     commentdate date not null,
     userid bigint not null,
     R_commentid bigint not null,
     constraint IDCOMMENTCOMMENT primary key (commentid));

create table COMMENTPOST (
     commentid bigint not null AUTO_INCREMENT,
     commenttext varchar(100) not null,
     commentdate date not null,
     userid bigint not null,
     Com_userid bigint not null,
     postid bigint not null,
     constraint IDCOMMENT primary key (commentid));

create table FOLLOWER (
     followerid bigint not null AUTO_INCREMENT,
     userid bigint not null,
     constraint IDfollower primary key (followerid));

create table FOLLOWING (
     followingid bigint not null AUTO_INCREMENT,
     userid bigint not null,
     constraint IDfollowing primary key (followingid));

create table NOTIFICATION (
     notificationid bigint not null AUTO_INCREMENT,
     notificationtext varchar(100) not null,
     notificationdate date not null,
     alreadyread char(1) not null,
     userid bigint not null,
     constraint IDNOTIFICATION primary key (notificationid));

create table POST (
     postid bigint not null AUTO_INCREMENT,
     posttext varchar(100) not null,
     postdate date not null,
     postimage varchar(100),
     userid bigint not null,
     constraint IDPOST primary key (postid));

create table LIKED (
     postid bigint not null,
     userid bigint not null,
     constraint IDLIKE primary key (postid, userid));

create table SAVED (
     postid bigint not null,
     userid bigint not null,
     constraint IDSAVED primary key (postid, userid));

create table SHARED (
     postid bigint not null,
     userid bigint not null,
     constraint IDSHARED primary key (postid, userid));

create table USER_CREDENTIAL (
     userid bigint not null AUTO_INCREMENT,
     useremail varchar(100) not null,
     passwordhash varchar(100) not null,
     active char(1) not null,
     constraint IDUSER_CREDENTIAL_ID primary key (userid));

create table USER_PROFILE (
     userid bigint not null AUTO_INCREMENT,
     Ass_userid bigint not null,
     username varchar(100) not null,
     usernickname varchar(100) not null,
     usericon varchar(100) not null,
     userbiography varchar(100) not null,
     constraint IDUSER primary key (userid),
     constraint FKassociate_ID unique (Ass_userid));


-- Constraints Section
-- ___________________ 

alter table POSTCATEGORY add constraint FKbel_POS
     foreign key (postid)
     references POST (postid);

alter table POSTCATEGORY add constraint FKbel_CAT
     foreign key (categoryid)
     references CATEGORY (categoryid);

alter table COMMENTCOMMENT add constraint FKcommentedcomment
     foreign key (userid)
     references USER_PROFILE (userid);

alter table COMMENTCOMMENT add constraint FKR
     foreign key (R_commentid)
     references COMMENTPOST (commentid);

alter table COMMENTPOST add constraint FKcommented
     foreign key (Com_userid)
     references USER_PROFILE (userid);

alter table COMMENTPOST add constraint FKbecommented
     foreign key (postid)
     references POST (postid);

alter table FOLLOWER add constraint FKhasfollower
     foreign key (userid)
     references USER_PROFILE (userid);

alter table FOLLOWING add constraint FKhasfollowing
     foreign key (userid)
     references USER_PROFILE (userid);

alter table NOTIFICATION add constraint FKnotify
     foreign key (userid)
     references USER_PROFILE (userid);

alter table POST add constraint FKusersendpost
     foreign key (userid)
     references USER_PROFILE (userid);

alter table LIKED add constraint FKLIK_USE
     foreign key (userid)
     references USER_PROFILE (userid);

alter table LIKED add constraint FKLIK_POS
     foreign key (postid)
     references POST (postid);

alter table SAVED add constraint FKSAV_USE
     foreign key (userid)
     references USER_PROFILE (userid);

alter table SAVED add constraint FKSAV_POS
     foreign key (postid)
     references POST (postid);

alter table SHARED add constraint FKSHA_USE
     foreign key (userid)
     references USER_PROFILE (userid);

alter table SHARED add constraint FKSHA_POS
     foreign key (postid)
     references POST (postid);

-- Not implemented
-- alter table USER_CREDENTIAL add constraint IDUSER_CREDENTIAL_CHK
--     check(exists(select * from USER_PROFILE
--                  where USER_PROFILE.Ass_userid = userid)); 

alter table USER_PROFILE add constraint FKassociate_FK
     foreign key (Ass_userid)
     references USER_CREDENTIAL (userid);


-- Index Section
-- _____________ 

