<?php

session_start();
session_destroy();
session_unset();
session_start();

require('dbconnect.php');

$method = $_SERVER["REQUEST_METHOD"];
$message = "Please login";

IF ($method == "POST") {
 $username = $_POST["username"];
 $password = $_POST["password"];
 

 
 IF ($username=="" OR $password=="") {
	 $message="Error: Please enter a Username and Password";
	 } else {
		 $conn = getConn();
		 $sql = "SELECT u.firstname, u.lastname, u.role  FROM users AS u WHERE u.userid=? AND PASSWORD=?";
		 $stmt = mysqli_stmt_init($conn);
		 $message = "Error: Login unsuccessfully attempted. Try Again";
		 $retCode = -1;
		 if (mysqli_stmt_prepare($stmt, $sql)) {
			 mysqli_stmt_bind_param($stmt,"ss",$username, $password);
			 mysqli_stmt_execute($stmt);
			 mysqli_stmt_bind_result($stmt,$firstname,$lastname,$role);
			 mysqli_stmt_store_result($stmt);
			 $rows = mysqli_stmt_num_rows($stmt);
			 //echo($rows);
			 if ($rows > 0) {
				while (mysqli_stmt_fetch($stmt)) {
					$message = "Login successfully completed. Welcome ".$firstname.' '.$lastname.' ('.$role.')';
					$_SESSION["userName"] = $username;
					$_SESSION["role"] = $role;
					$_SESSION["firstname"] = $firstname;
					$_SESSION["lastname"] = $lastname;
					$_SESSION["footer"] = "Current User: ".$username." (".$firstname." ".$lastname."- ".$role.")";
				}
			 }
			 
			 mysqli_stmt_close($stmt); 
		 
		 }
		 //$message = "Welcome ".$username;
	 }
 
}


?>

<!DOCTYPE html>
<html>
	<head>
		<title>Movie Website - Login</title>  									<!-- top of chrome tab bar -->
		<link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
		<link href='https://fonts.googleapis.com/css?family=Secular One' rel='stylesheet'>
		<link rel="icon" href="img/marnus.png">
	

	</head>

<body>

	
	<?php require("nav.php"); ?>
	
	
	<div class="logincss">
		<main>							<!-- MAIN= includes content that is unqiue to the page -->
	
	<h1>Login</h1>
	<form name="login" id="login" method="post" action="">
		<table>
			<tr> 																		<!-- TR = Table Row -->
				<td>Username</td>													   	<!-- TD = cell -->
				<td><input type="text" name="username" id="username"></input></td>
			</tr>
			<tr>
				<td>Password</td>													   	
				<td><input type="text" name="password" id="password"></input></td>
			</tr>
			<tr>
				<td colspan="2" align="center">								<!-- COLSPAN = span over two collumns -->
				<button type="sumbit" name="sumbit" id="submit">Login</button>
				</td>
			</tr>
			<tr>
				<td colspan="2"><?php echo($message); ?>
				</td>
			</tr>
				
			
		</table>
	</form>
	
	
	</div>
	</main>
	 
</body>

</html>