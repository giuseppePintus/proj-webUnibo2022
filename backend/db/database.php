
<?php
class DatabaseHelper
{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function getRandomPost($n){
            $stmt = $this->db->prepare("SELECT p.postid, usericon, usernickname, username, postdate, posttext, postimage, COUNT(l.postid) as liked,
            (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid) as commented,
            (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid) as saved
            FROM POST p
            INNER JOIN USER_PROFILE up on up.userid = p.userid
            LEFT JOIN LIKED l on l.postid = p.postid AND p.userid = up.userid
            GROUP BY p.postid
            ORDER BY p.postid
            DESC LIMIT ?");
        $stmt->bind_param('i', $n);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUser($offset,$size,$string ,$userid){
        
        $stmt = $this->db->prepare("SELECT DISTINCT u.* ,
        (SELECT COUNT(*) FROM OTHERUSER o WHERE u.userid = o.fol_userid AND o.userid = ? ) AS follow,
        (LENGTH(username) - LENGTH(REPLACE(username, ?, ''))) / LENGTH(?) * 100 AS similarity 
        FROM USER_PROFILE u
        WHERE username LIKE ? AND u.userid != ? 
        ORDER BY similarity DESC 
        LIMIT ? ,?;");
        $string2 = "%".$string."%";
        $stmt->bind_param('isssiii',$userid,$string, $string, $string2, $userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    public function searchRandomUser($offset,$size, $userid){
        
        $stmt = $this->db->prepare("SELECT DISTINCT u.* ,
            (SELECT COUNT(*) FROM OTHERUSER o 
                WHERE u.userid = o.fol_userid AND o.userid = ? ) AS follow
            FROM USER_PROFILE u
            WHERE u.userid != ? 
            ORDER BY u.userid
            LIMIT ? , ?;");
        $stmt->bind_param('iiii',$userid,$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchFollowedUser($offset,$size, $string,$userid,$loggedUserId){
        
        $stmt = $this->db->prepare("SELECT u.*,
            (SELECT COUNT(*) FROM OTHERUSER o1 WHERE o1.userid = ? AND o1.fol_userid = u.userid) as follow
            FROM USER_PROFILE u
            WHERE (u.username LIKE ? OR u.usernickname LIKE ? ) AND u.userid IN 
                (SELECT o.userid FROM OTHERUSER o WHERE o.fol_userid = ? )
                AND u.userid != ?
            LIMIT ?, ?;");
        $string = "%".$string."%";
        $stmt->bind_param('issiiii',$loggedUserId,$string,$string, $userid, $loggedUserId,$offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchFollowingUser($offset,$size, $string,$userid,$loggedUserId){
        
        $stmt = $this->db->prepare("SELECT u.*,
            (SELECT COUNT(*) FROM OTHERUSER o1 WHERE o1.userid = ? AND o1.fol_userid = u.userid) as follow
            FROM USER_PROFILE u
            WHERE (u.username LIKE ? OR u.usernickname LIKE ?) AND u.userid IN (SELECT o.fol_userid
                FROM OTHERUSER o
                WHERE o.userid = ? AND o.fol_userid != ? )
            LIMIt ?,?;");
        $string = "%".$string."%";
        $stmt->bind_param('issiiii',$loggedUserId,$string,$string, $userid, $loggedUserId,$offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function searchUserInfo($userid){        
        $stmt = $this->db->prepare("SELECT up.* ,
        (SELECT COUNT(*) FROM USER_PROFILE up2, OTHERUSER o2 WHERE up2.userid = o2.userid AND up2.userid = ?) as followingNumber,
        (SELECT COUNT(*) FROM USER_PROFILE up2, OTHERUSER o2 WHERE up2.userid = o2.fol_userid AND up2.userid = ?) as followedNumber
        FROM USER_PROFILE up 
        WHERE up.userid = ?;");
        $stmt->bind_param('iii',$userid, $userid, $userid);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }
    public function searchOtherUserInfo($userid,$otheruser){        
        $stmt = $this->db->prepare("SELECT up.* ,
        (SELECT COUNT(*) FROM USER_PROFILE up2, OTHERUSER o2 WHERE up2.userid = o2.userid AND up2.userid = ?) as followingNumber,
        (SELECT COUNT(*) FROM USER_PROFILE up2, OTHERUSER o2 WHERE up2.userid = o2.fol_userid AND up2.userid = ?) as followedNumber,
        (SELECT COUNT(*) FROM  OTHERUSER o WHERE up.userid = o.fol_userid AND o.userid = ?) as follow
        FROM USER_PROFILE up 
        WHERE up.userid = ?;");
        $stmt->bind_param('iiii',$otheruser, $otheruser, $userid,$otheruser);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }

    public function searchUserPost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT DISTINCT p.*, u.*,
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) AS liked, 
        (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid ) AS commented, 
        (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
        FROM `POST` p
        JOIN `USER_PROFILE` u ON u.userid = p.userid AND u.userid = ?
        ORDER BY p.`postdate` DESC ,p.postid DESC 
        LIMIT ? , ?;");
         $stmt->bind_param('iiii',$userid,$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUserLikedPost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT DISTINCT p.*, u.*,
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) AS liked, 
        (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid) AS commented, 
        (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
        FROM `POST` p
        JOIN `LIKED` l ON l.postid = p.postid
        JOIN `USER_PROFILE` u ON  u.userid = p.userid
        WHERE (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) = 1 
        ORDER BY p.`postdate` DESC ,p.postid DESC    
        LIMIT ? , ?;");
          $stmt->bind_param('iiii',$userid,$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUserCommentedPost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT DISTINCT p.*, u.*,
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) AS liked, 
        (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid) AS commented, 
        (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
        FROM `POST` p
        JOIN `COMMENTPOST` c ON c.postid = p.postid
        JOIN `USER_PROFILE` u ON  u.userid = p.userid
        WHERE (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid AND cp.Com_userid = ?) > 0 
        ORDER BY p.`postdate` DESC ,p.postid DESC       
        LIMIT ? , ?;");
         $stmt->bind_param('iiii',$userid,$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUserSavedPost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT DISTINCT p.*, u.*,
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
        (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) AS liked, 
        (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid) AS commented, 
        (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
        FROM `POST` p
        JOIN `SAVED` s ON s.postid = p.postid
        JOIN `USER_PROFILE` u ON  u.userid = p.userid
        WHERE (SELECT COUNT(*) FROM SAVED s1 WHERE s1.postid = p.postid AND s1.userid = ?) > 0 
        ORDER BY p.`postdate` DESC ,p.postid DESC       
        LIMIT ? , ?;");
         $stmt->bind_param('iiii',$userid,$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUserHomePost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT DISTINCT p.*, u.*, 
            (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
            (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) AS liked, 
            (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid ) AS commented, 
            (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
            FROM `POST` p 
            JOIN `OTHERUSER` o ON p.`userid` = o.fol_userid OR p.`userid` = o.userid AND o.userid = ? 
            JOIN `USER_PROFILE` u ON u.userid = p.userid         
            ORDER BY p.`postdate` DESC ,p.postid DESC 
            LIMIT ? , ?;");
        $stmt->bind_param('iiii',$userid,$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchPost($postid){      
        $stmt = $this->db->prepare("SELECT DISTINCT p.*,
            (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
            (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid ) AS commented, 
            (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
            FROM `POST` p 
            WHERE p.postid = ? ;");
        $stmt->bind_param('i',$postid);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }

    public function modifyUserNickname($userid, $nickname){
        $query = "UPDATE USER_PROFILE 
        SET usernickname = ?
        WHERE userid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('si', $nickname, $userid);
        $stmt->execute();

    }

    public function modifyUserBio($userid, $bio){
        $query = "UPDATE USER_PROFILE 
        SET userbiography = ?
        WHERE userid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('si', $bio, $userid);
        $stmt->execute();
    }

    public function modifyUserIcon($userid, $iconPath){
        $query = "UPDATE USER_PROFILE 
        SET usericon = ?
        WHERE userid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('si', $iconPath, $userid);
        $stmt->execute();

    }

    public function searchRandomPost($offset,$size, $userid){     
        $stmt = $this->db->prepare("SELECT DISTINCT p.*, u.*,
            (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid ) AS nlike, 
            (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid AND l.userid = ? ) AS liked, 
            (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid ) AS commented, 
            (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid ) AS saved 
        FROM POST p
        JOIN USER_PROFILE u ON u.userid = p.userid AND u.userid != ? AND u.userid not in (select o.fol_userid from OTHERUSER o where o.userid = ?)
        LEFT JOIN OTHERUSER o ON o.userid != ? 
        ORDER BY p.`postdate` DESC ,p.postid DESC
        LIMIT ?, ?;");
        
        $stmt->bind_param('iiiiii',$userid ,$userid , $userid ,$userid , $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getUserIdFromPostId($postid){
        $query = "SELECT up.userid FROM POST p, USER_PROFILE up
        WHERE p.userid = up.userid AND postid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postid);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);

    }

    public function sendNewPost($userid, $posttext, $postImageUrl)
    {
        $query = "INSERT INTO POST (posttext, postdate, postimage, userid) VALUES (?,  current_timestamp(), ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssi', $posttext, $postImageUrl, $userid);
        $stmt->execute();

        return $stmt->insert_id;
    }

    public function userLikedPost($userid, $postid){
        $stmt = $this->db->prepare("INSERT INTO LIKED(postid, userid) VALUES(?, ?)");
        $stmt->bind_param('ii', $postid, $userid);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function userSavedPost($userid, $postid){
        $stmt = $this->db->prepare("INSERT INTO SAVED(postid, userid) VALUES(?, ?)");
        $stmt->bind_param('ii', $postid, $userid);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function userUnLikedPost($userid, $postid){
        $stmt = $this->db->prepare("DELETE FROM LIKED
        WHERE postid = ? AND userid = ?");
        $stmt->bind_param('ii', $postid, $userid);
        $stmt->execute();
    }

    public function userUnsavedPost($userid, $postid){
        $stmt = $this->db->prepare("DELETE FROM SAVED
        WHERE postid = ? AND userid = ?");
        $stmt->bind_param('ii', $postid, $userid);
        $stmt->execute();
    }


    public function readIfUserLikedPost($postid, $userid){
        $query = "SELECT COUNT(*) as likes
        FROM LIKED l
        WHERE l.postid = ? AND l.userid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $postid, $userid);
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function readIfUserSavedPost($postid, $userid){
        $query = "SELECT COUNT(*) as saves
        FROM SAVED s
        WHERE s.postid = ? AND s.userid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $postid, $userid);
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function userFollow($userid ,$followID){
        $stmt = $this->db->prepare("INSERT INTO OTHERUSER(`userid`, `fol_userid`) VALUES(?, ?)");
        $stmt->bind_param('ii',  $userid ,$followID);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function userUnfollow($userid ,$followID){
        $stmt = $this->db->prepare("DELETE FROM OTHERUSER
        WHERE userid = ? AND fol_userid = ?");
        $stmt->bind_param('ii', $userid  ,$followID  );
        $stmt->execute();
    }

    public function checkUserFollow($userid ,$followID){
        $query = "SELECT COUNT(*) AS count FROM `OTHERUSER` WHERE `userid` = ? and `fol_userid` = ?;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',  $userid ,$followID);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC)[0];

    }

    public function getPostComments($postid){
        $query = "SELECT cp.commentid, cp.commenttext, cp.Com_userid as userid, cp.commentdate, up.usericon, up.username FROM POST p, COMMENTPOST cp,  USER_PROFILE up
        WHERE p.postid = cp.postid AND cp.Com_userid = up.userid AND p.postid = ? ORDER BY cp.commentid DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $postid);
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function insertCommentToPost($postid, $commentText, $userid){
        $query = "INSERT INTO COMMENTPOST(commenttext, commentdate, Com_userid, postid) VALUES(?, current_timestamp(), ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sii', $commentText, $userid, $postid);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function getNotificationsToReadNumber($userid){
        $query = "SELECT COUNT(*) as number FROM `NOTIFICATION` n WHERE n.to_userid = ? AND n.alreadyread = 0";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $userid);
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getNotifications($userid){
        $query = "SELECT up.userid, up.username, up.usericon, up.usernickname, n.notificationid, n.notificationtext, n.notificationdate, n.alreadyread 
        FROM `NOTIFICATION` n, `USER_PROFILE` up
        WHERE n.to_userid = ? AND up.userid = n.from_userid ORDER BY n.alreadyread, n.notificationid DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $userid);
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function readNotification($notificationid, $userid){
        $query = "UPDATE NOTIFICATION n
        SET alreadyread = 1
        WHERE n.to_userid = ? AND n.notificationid = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $userid, $notificationid);
        $stmt->execute();
    }

    public function sendNotifications($notificationtext, $to_userid, $from_userid){
        $query = "INSERT INTO NOTIFICATION (notificationid, notificationtext, notificationdate, alreadyread, to_userid, from_userid) VALUES (NULL, ?, NOW(), 0, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sii', $notificationtext, $to_userid, $from_userid);
        $stmt->execute();
        return $stmt->insert_id;
    }

    
    public function checkUserExist($username){
        $query = "SELECT count(username) FROM `USER_PROFILE` where username = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->fetch_row()[0] > 0) {
            return true; 
        } 

        return false;
    }

    public function checkEmailExist($email){ //da controllare se funziona bene      
        $query = "SELECT count(useremail) FROM `USER_CREDENTIAL` where useremail = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
       
       if ($result->fetch_row()[0] > 0) {
            return true; 
        } 

        return false;
  
    }

    public function getUserPassHash($username){
        $query = " SELECT uc.passwordhash 
                    FROM `USER_PROFILE` up, `USER_CREDENTIAL` uc 
                    where up.userid = uc.userid and up.username = ? ; ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_row();
    }

    public function addAccount($username, $useremail, $usernickname, $passwordhash){ // da controllare se funziona bene

        $stmt = $this->db->prepare("INSERT INTO `USER_CREDENTIAL` (`userid`, `useremail`, `passwordhash`, `active`) 
                                VALUES (NULL, ?, ?, '1')");

        $stmt->bind_param('ss', $useremail, $passwordhash);
        $stmt->execute();
        $stmt = $this->db->prepare("SET @id = (SELECT `userid` 
                                FROM `USER_CREDENTIAL` 
                                WHERE `useremail` = ?)");

        $stmt->bind_param('s', $useremail);
        $stmt->execute();
        $stmt = $this->db->prepare("INSERT INTO `USER_PROFILE` (`userid`, `username`, `usernickname`, `usericon`, `userbiography`) 
                                VALUES (@id, ?, ?, 'upload/user.png', ' ')");
        $stmt->bind_param('ss', $username, $usernickname);
        $stmt->execute();

        $result = $stmt->get_result();
        return $result;
    }
    public function getUserId($username){ // da controllare se funziona bene


        $stmt = $this->db->prepare("SELECT `userid` FROM `USER_PROFILE` WHERE `username` = ? ;");

        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_row();
    }

    public function getCurrentUserInfo(){
        $stmt = $this->db->prepare("SELECT useremail , username, usernickname ,usericon, userbiography 
                                    FROM `USER_CREDENTIAL` uc , `user_profile` up 
                                    WHERE uc.userid = up.userid and up.username = ?;
                                    ");

        $stmt->bind_param('s', $_SESSION['Username']);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result-> fetch_row();

    }

    public function setNewPassword($newPassword, $userId){

        $stmt = $this->db->prepare("UPDATE `USER_CREDENTIAL` SET `passwordhash`= ? WHERE `userid` = ?");
        $stmt->bind_param('ss', $newPassword, $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }

    public function getLoginAttempts($userid){
        $stmt = $this->db->prepare("SELECT COUNT(`time`) FROM `LOGIN_ATTEMPTS` WHERE `userid`= ? and `time` >= now() - interval 5 minute;");
        $stmt->bind_param('i', $userid);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_row();
    }

    public function addLoginAttempts($userid){
        $stmt = $this->db->prepare("INSERT INTO `LOGIN_ATTEMPTS`(`time`,`userid`) VALUES( null , ? )");
        $stmt->bind_param('i', $userid);
        $stmt->execute();
        return $stmt->get_result();;
    }
}