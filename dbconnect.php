<?php
function getConn() {
 $dbserver  = $_SERVER['SERVER_NAME']; 
 $dbusername = "10ist";
 $dbpassword = "password";
 $dbname = "studentdb";
 $conn = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
 // Check connection
 
 if (!$conn) {
	die("Failed to connect to MySQL: " .mysqli_connect_error());
 } 
	return $conn;
}
?>