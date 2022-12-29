<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port){
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }        
    }

    public function getRandomPost($n){
        $stmt = $this->db->prepare("SELECT p.postid, usericon, usernickname, username, postdate, posttext, postimage, COUNT(l.postid) as liked 
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
    public function searchUser($start,$end,$string,$username){
        
        $stmt = $this->db->prepare("SELECT username,usernickname ,usericon, 
        (LENGTH(username) - LENGTH(REPLACE(username, ?, ''))) / LENGTH(?) * 100 AS similarity 
        FROM USER_PROFILE 
        WHERE username LIKE ? AND username != ? 
        ORDER BY similarity DESC 
        LIMIT ? ,?");

        $string2 = "%".$string."%";
        $stmt->bind_param('ssssii',$string, $string, $string2, $username, $start, $end);
        $stmt->execute();
        $result = $stmt->get_result();
        
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function sendNewPost($userid, $posttext, $postImageUrl){
        $query = "INSERT INTO POST (posttext, postdate, postimage, userid) VALUES (?,  current_timestamp(), ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssi',$posttext, $postImageUrl, $userid);
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


    /*------------------------------------------end our file--------------------------------------*/
   
    /*These functions are useful to us as riferiment, they will be deleted later.....*/
    public function getCategories(){
        $stmt = $this->db->prepare("SELECT * FROM categoria");
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getCategoryById($idcategory){
        $stmt = $this->db->prepare("SELECT nomecategoria FROM categoria WHERE idcategoria=?");
        $stmt->bind_param('i',$idcategory);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPosts($n=-1){
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo, anteprimaarticolo, dataarticolo, nome FROM articolo, autore WHERE autore=idautore ORDER BY dataarticolo DESC";
        if($n > 0){
            $query .= " LIMIT ?";
        }
        $stmt = $this->db->prepare($query);
        if($n > 0){
            $stmt->bind_param('i',$n);
        }
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostById($id){
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo, testoarticolo, dataarticolo, nome FROM articolo, autore WHERE idarticolo=? AND autore=idautore";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByCategory($idcategory){
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo, anteprimaarticolo, dataarticolo, nome FROM articolo, autore, articolo_ha_categoria WHERE categoria=? AND autore=idautore AND idarticolo=articolo";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$idcategory);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByIdAndAuthor($id, $idauthor){
        $query = "SELECT idarticolo, anteprimaarticolo, titoloarticolo, imgarticolo, testoarticolo, dataarticolo, (SELECT GROUP_CONCAT(categoria) FROM articolo_ha_categoria WHERE articolo=idarticolo GROUP BY articolo) as categorie FROM articolo WHERE idarticolo=? AND autore=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$id, $idauthor);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostByAuthorId($id){
        $query = "SELECT idarticolo, titoloarticolo, imgarticolo FROM articolo WHERE autore=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertArticle($titoloarticolo, $testoarticolo, $anteprimaarticolo, $dataarticolo, $imgarticolo, $autore){
        $query = "INSERT INTO articolo (titoloarticolo, testoarticolo, anteprimaarticolo, dataarticolo, imgarticolo, autore) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssssi',$titoloarticolo, $testoarticolo, $anteprimaarticolo, $dataarticolo, $imgarticolo, $autore);
        $stmt->execute();
        
        return $stmt->insert_id;
    }

    public function updateArticleOfAuthor($idarticolo, $titoloarticolo, $testoarticolo, $anteprimaarticolo, $imgarticolo, $autore){
        $query = "UPDATE articolo SET titoloarticolo = ?, testoarticolo = ?, anteprimaarticolo = ?, imgarticolo = ? WHERE idarticolo = ? AND autore = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssii',$titoloarticolo, $testoarticolo, $anteprimaarticolo, $imgarticolo, $idarticolo, $autore);
        
        return $stmt->execute();
    }

    public function deleteArticleOfAuthor($idarticolo, $autore){
        $query = "DELETE FROM articolo WHERE idarticolo = ? AND autore = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$idarticolo, $autore);
        $stmt->execute();
        var_dump($stmt->error);
        return true;
    }

    public function insertCategoryOfArticle($articolo, $categoria){
        $query = "INSERT INTO articolo_ha_categoria (articolo, categoria) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$articolo, $categoria);
        return $stmt->execute();
    }

    public function deleteCategoryOfArticle($articolo, $categoria){
        $query = "DELETE FROM articolo_ha_categoria WHERE articolo = ? AND categoria = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$articolo, $categoria);
        return $stmt->execute();
    }

    public function deleteCategoriesOfArticle($articolo){
        $query = "DELETE FROM articolo_ha_categoria WHERE articolo = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$articolo);
        return $stmt->execute();
    }

    public function getAuthors(){
        $query = "SELECT username, nome, GROUP_CONCAT(DISTINCT nomecategoria) as argomenti FROM categoria, articolo, autore, articolo_ha_categoria WHERE idarticolo=articolo AND categoria=idcategoria AND autore=idautore AND attivo=1 GROUP BY username, nome";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkLogin($username, $password){
        $query = "SELECT idautore, username, nome FROM autore WHERE attivo=1 AND username = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }    

}
?>