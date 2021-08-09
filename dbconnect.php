<?php
function getConn() {
 $dbserver  = $_SERVER['SERVER_NAME']; 
 $dbusername = "root";
 $dbpassword = "";
 $dbname = "studentdb";
 $conn = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
 // Check connection
 
 if (!$conn) {
	die("Failed to connect to MySQL: " .mysqli_connect_error());
 } 
	return $conn;
}
?>