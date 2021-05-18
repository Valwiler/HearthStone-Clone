<?php
    require_once("action/DAO/constants.php");
    
    class Connection {
        private static $connection;

        public static function getConnection() {
            if (empty(Connection::$connection)) {
                var_dump(DB_DATABASE);
                Connection::$connection = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_DATABASE, DB_USER, DB_PASS);
                Connection::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                Connection::$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }

            return Connection::$connection;
        }
    }