<?php
    require_once("action/DAO/Connection.php");

    class UserDAO {

        public static function authenticate($username, $password) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC); 
            $statement->execute();

            $user = null;

            if ($row = $statement->fetch()) {
                if (password_verify($password, $row["password"])) {
                    $user = $row;
                }
            }
            return $user;
        }

        public static function updateProfile($user) {
            $connection = Connection::getConnection();
        }
        public static function getComments(){
            
            $connection = Connection::getConnection();
            
            $statement = $connection->prepare("SELECT * FROM Posts");
            $statement->setFetchMode(PDO::FETCH_ASSOC); 
            $statement->execute();

            $result = $statement->fetchall();
     
            
            return $result ;
        }

        public static function insertPost($user, $post ){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO Posts( Postdate, Username, Comment ) VALUES(NOW() ,? ,?)");
            $statement->bindParam(1, $user);
            $statement->bindParam(2, $post);
            $statement->execute();

        }

        public static function deletePost($user, $post ){

        }

    }