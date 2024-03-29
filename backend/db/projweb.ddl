-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 20 2021              
-- * Generation date: Thu Jan 12 17:36:32 2023 
-- * LUN file: /home/zaks/university_projects/proj-webUnibo2022/projweb.lun 
-- * Schema: TachyonDB/1-1-1 
-- ********************************************* 


-- Database Section
-- ________________ 

create database TachyonDB;
use TachyonDB;


-- Tables Section
-- _____________ 

create table CATEGORY (
     categoryid bigint not null,
     categoryname varchar(100) not null,
     constraint IDCATEGORY primary key (categoryid));

create table COMMENTCOMMENT (
     commentid bigint not null,
     commenttext varchar(100) not null,
     commentdate date not null,
     userid bigint not null,
     R_commentid bigint not null,
     constraint IDCOMMENTCOMMENT primary key (commentid));

create table COMMENTPOST (
     commentid bigint not null,
     commenttext varchar(100) not null,
     commentdate date not null,
     Com_userid bigint not null,
     postid bigint not null,
     constraint IDCOMMENT primary key (commentid));

create table LOGIN_ATTEMPTS (
     time date not null,
     userid bigint not null,
     constraint IDLOGIN_ATTEMPTS primary key (time));

create table LIKED (
     postid bigint not null,
     userid bigint not null,
     constraint IDLIKE primary key (postid, userid));

create table NOTIFICATION (
     notificationid bigint not null,
     notificationtext varchar(100) not null,
     notificationdate date not null,
     alreadyread char(1) not null,
     to_userid bigint not null,
     from_userid bigint not null,
     constraint IDNOTIFICATION primary key (notificationid));

create table OTHERUSER (
     userid bigint not null,
     fol_userid	 bigint not null);

create table POST (
     postid bigint not null,
     posttext varchar(100) not null,
     postdate date not null,
     postimage varchar(100),
     userid bigint not null,
     constraint IDPOST primary key (postid));

create table POSTCATEGORY (
     categoryid bigint not null,
     postid bigint not null,
     constraint IDbelongsto primary key (categoryid, postid));

create table SAVED (
     postid bigint not null,
     userid bigint not null,
     constraint IDSAVED primary key (postid, userid));

create table SHARED (
     postid bigint not null,
     userid bigint not null,
     constraint IDSHARED primary key (postid, userid));

create table USER_CREDENTIAL (
     userid bigint not null,
     useremail varchar(100) not null,
     passwordhash varchar(100) not null,
     active char(1) not null,
     constraint IDUSER_CREDENTIAL_ID primary key (userid));

create table USER_PROFILE (
     Ass_userid bigint not null,
     username varchar(100) not null,
     usernickname varchar(100) not null,
     usericon varchar(100) not null,
     userbiography varchar(100) not null,
     constraint IDUSER primary key (Ass_userid),
     constraint FKassociate_ID unique (Ass_userid));


-- Constraints Section
-- ___________________ 

alter table COMMENTCOMMENT add constraint FKcommentedcomment
     foreign key (userid)
     references USER_PROFILE (Ass_userid);

alter table COMMENTCOMMENT add constraint FKR
     foreign key (R_commentid)
     references COMMENTPOST (commentid);

alter table COMMENTPOST add constraint FKcommented
     foreign key (Com_userid)
     references USER_PROFILE (Ass_userid);

alter table COMMENTPOST add constraint FKbecommented
     foreign key (postid)
     references POST (postid);

alter table LOGIN_ATTEMPTS add constraint FKR
     foreign key (userid)
     references USER_CREDENTIAL (userid);

alter table LIKED add constraint FKLIK_USE
     foreign key (userid)
     references USER_PROFILE (Ass_userid);

alter table LIKED add constraint FKLIK_POS
     foreign key (postid)
     references POST (postid);

alter table NOTIFICATION add constraint FKR_1
     foreign key (to_userid)
     references USER_PROFILE (Ass_userid);

alter table NOTIFICATION add constraint FKR
     foreign key (from_userid)
     references USER_PROFILE (Ass_userid);

alter table OTHERUSER add constraint FKfollower
     foreign key (userid)
     references USER_PROFILE (Ass_userid);

alter table OTHERUSER add constraint FKfollowing
     foreign key (fol_userid	)
     references USER_PROFILE (Ass_userid);

alter table POST add constraint FKusersendpost
     foreign key (userid)
     references USER_PROFILE (Ass_userid);

alter table POSTCATEGORY add constraint FKbel_POS
     foreign key (postid)
     references POST (postid);

alter table POSTCATEGORY add constraint FKbel_CAT
     foreign key (categoryid)
     references CATEGORY (categoryid);

alter table SAVED add constraint FKSAV_USE
     foreign key (userid)
     references USER_PROFILE (Ass_userid);

alter table SAVED add constraint FKSAV_POS
     foreign key (postid)
     references POST (postid);

alter table SHARED add constraint FKSHA_USE
     foreign key (userid)
     references USER_PROFILE (Ass_userid);

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

