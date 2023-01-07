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

    public function searchUser($offset,$size,$string,$username){
        
        $stmt = $this->db->prepare("SELECT userid, username ,usernickname ,usericon, 
        (LENGTH(username) - LENGTH(REPLACE(username, ?, ''))) / LENGTH(?) * 100 AS similarity 
        FROM USER_PROFILE 
        WHERE username LIKE ? AND username != ? 
        ORDER BY similarity DESC 
        LIMIT ? ,?");

        $string2 = "%".$string."%";
        $stmt->bind_param('ssssii',$string, $string, $string2, $username, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    public function searchRandomUser($offset,$size,$username){
        
        $stmt = $this->db->prepare("SELECT userid, username ,usernickname ,usericon 
            FROM USER_PROFILE 
            WHERE username != ? 
            ORDER BY RAND() LIMIT ? ,?;");
        $stmt->bind_param('sii',$username, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUserInfo($userid){        
        $stmt = $this->db->prepare("SELECT * FROM `USER_PROFILE` WHERE `userid`= ?;");
        $stmt->bind_param('i',$userid);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC)[0];
    }
    public function searchUserPost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT `postid`,`posttext`,`postdate`,`postimage` FROM `POST`
            WHERE `userid`= ? 
            ORDER BY `postdate` ASC    
            LIMIT ? , ?;");
        $stmt->bind_param('iii',$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchUserHomePost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT p.*, u.*,
            (SELECT COUNT(*) FROM `LIKED` l WHERE l.postid = p.postid) AS liked,
            (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid) AS commented,
            (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid) AS saved
            FROM `POST` p
            JOIN `OTHERUSER` o ON p.`userid` = o.fol_userid AND p.`userid` != o.userid 
            JOIN `USER_PROFILE` u ON u.userid = p.userid AND u.userid != ?
            GROUP BY p.postid
            ORDER BY p.`postdate` DESC   
            LIMIT ? , ?;");
        $stmt->bind_param('iii',$userid, $offset, $size);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function searchRandomPost($offset,$size, $userid){      
        $stmt = $this->db->prepare("SELECT p.*, u.*,
          (SELECT COUNT(*) FROM LIKED l WHERE l.postid = p.postid) AS liked,
          (SELECT COUNT(*) FROM COMMENTPOST cp WHERE cp.postid = p.postid) AS commented,
          (SELECT COUNT(*) FROM SAVED s WHERE s.postid = p.postid) AS saved
        FROM POST p
        JOIN USER_PROFILE u ON u.userid = p.userid AND u.userid != ? AND u.userid not in (select o.fol_userid from otheruser o where o.userid = ?)
        LEFT JOIN OTHERUSER o ON o.userid != ? 
        GROUP BY p.postid
        ORDER BY p.postdate DESC
        LIMIT ?, ?;");
        $stmt->bind_param('iiiii',$userid ,$userid ,$userid , $offset, $size);
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

    public function userUnLikedPost($userid, $postid){
        $stmt = $this->db->prepare("DELETE FROM LIKED
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

    public function userFollow($userid ,$followID){
        $stmt = $this->db->prepare("INSERT INTO OTHERUSER(`userid`, `fol_userid`) VALUES(?, ?)");
        $stmt->bind_param('ii',  $userid ,$followID);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function userUnfollow($userid ,$followID){
        $stmt = $this->db->prepare("DELETE FROM OTHERUSER
        WHERE fol_userid = ? AND userid = ?");
        $stmt->bind_param('ii', $followID  ,$userid );
        $stmt->execute();
    }

    public function checkUserFollow($userid ,$followID){
        $query = "SELECT * FROM `OTHERUSER` WHERE `userid` = ? and `fol_userid` = ?;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',  $userid ,$followID);
        $stmt->execute();

       
        $result = $stmt->get_result();

        if (mysqli_num_rows($result) > 0) {
        return true;
        } 
        return false;

    }

    public function getPostComments($postid){
        $query = "SELECT cp.commentid, cp.commenttext, cp.Com_userid as userid, up.usericon, up.username FROM POST p, COMMENTPOST cp,  USER_PROFILE up
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
        WHERE n.to_userid = ? AND up.userid = n.to_userid ORDER BY n.alreadyread, n.notificationid DESC";
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
        $stmt = $this->db->prepare("INSERT INTO `user_profile` (`userid`, `username`, `usernickname`, `usericon`, `userbiography`) 
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


    /*------------------------------------------end our file--------------------------------------*/

    /*These functions are useful to us as riferiment, they will be deleted later.....*/
    public function getCategories()
    {
        $stmt = $this->db->prepare("SELECT * FROM categoria");
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getCategoryById($idcategory)
    {
        $stmt = $this->db->prepare("SELECT nomecategoria FROM categoria WHERE idcategoria=?");
        $stmt->bind_param('i', $idcategory);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPosts($n = -1)
    {
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo, anteprimaarticolo, dataarticolo, nome FROM articolo, autore WHERE autore=idautore ORDER BY dataarticolo DESC";
        if ($n > 0) {
            $query .= " LIMIT ?";
        }
        $stmt = $this->db->prepare($query);
        if ($n > 0) {
            $stmt->bind_param('i', $n);
        }
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostById($id)
    {
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo, testoarticolo, dataarticolo, nome FROM articolo, autore WHERE idarticolo=? AND autore=idautore";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByCategory($idcategory)
    {
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo, anteprimaarticolo, dataarticolo, nome FROM articolo, autore, articolo_ha_categoria WHERE categoria=? AND autore=idautore AND idarticolo=articolo";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $idcategory);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByIdAndAuthor($id, $idauthor)
    {
        $query = "SELECT idarticolo, anteprimaarticolo, titoloarticolo, imgarticolo, testoarticolo, dataarticolo, (SELECT GROUP_CONCAT(categoria) FROM articolo_ha_categoria WHERE articolo=idarticolo GROUP BY articolo) as categorie FROM articolo WHERE idarticolo=? AND autore=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $idauthor);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByAuthorId($id)
    {
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo FROM articolo WHERE autore=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertArticle($titoloarticolo, $testoarticolo, $anteprimaarticolo, $dataarticolo, $imgarticolo, $autore)
    {
        $query = "INSERT INTO articolo (titoloarticolo, testoarticolo, anteprimaarticolo, dataarticolo, imgarticolo, autore) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssssi', $titoloarticolo, $testoarticolo, $anteprimaarticolo, $dataarticolo, $imgarticolo, $autore);
        $stmt->execute();

        return $stmt->insert_id;
    }

    public function updateArticleOfAuthor($idarticolo, $titoloarticolo, $testoarticolo, $anteprimaarticolo, $imgarticolo, $autore)
    {
        $query = "UPDATE articolo SET titoloarticolo = ?, testoarticolo = ?, anteprimaarticolo = ?, imgarticolo = ? WHERE idarticolo = ? AND autore = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssii', $titoloarticolo, $testoarticolo, $anteprimaarticolo, $imgarticolo, $idarticolo, $autore);

        return $stmt->execute();
    }

    public function deleteArticleOfAuthor($idarticolo, $autore)
    {
        $query = "DELETE FROM articolo WHERE idarticolo = ? AND autore = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $idarticolo, $autore);
        $stmt->execute();
        var_dump($stmt->error);
        return true;
    }

    public function insertCategoryOfArticle($articolo, $categoria)
    {
        $query = "INSERT INTO articolo_ha_categoria (articolo, categoria) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $articolo, $categoria);
        return $stmt->execute();
    }

    public function deleteCategoryOfArticle($articolo, $categoria)
    {
        $query = "DELETE FROM articolo_ha_categoria WHERE articolo = ? AND categoria = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $articolo, $categoria);
        return $stmt->execute();
    }

    public function deleteCategoriesOfArticle($articolo)
    {
        $query = "DELETE FROM articolo_ha_categoria WHERE articolo = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $articolo);
        return $stmt->execute();
    }

    public function getAuthors()
    {
        $query = "SELECT username, nome, GROUP_CONCAT(DISTINCT nomecategoria) as argomenti FROM categoria, articolo, autore, articolo_ha_categoria WHERE idarticolo=articolo AND categoria=idcategoria AND autore=idautore AND attivo=1 GROUP BY username, nome";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkLogin($username, $password)
    {
        $query = "SELECT idautore, username, nome FROM autore WHERE attivo=1 AND username = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
