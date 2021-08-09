<?php
	
	session_start();
	
	if (!isset($_SESSION['userName'])) {
	header("Location: login.php");
	exit;
	}else {
		//Retrive all session variables that you wish to recover
		$username = $_SESSION["userName"];
		$footer = $_SESSION["footer"];
	}
?>