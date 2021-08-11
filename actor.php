



<html>
<head>
    <title>Movie Website</title>
    <!--stylesheets-->

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <!--Chrome Tab Icon-->
    <link rel="icon" href="">
    <!--font-->
    <link href='https://fonts.googleapis.com/css?family=Secular One' rel='stylesheet'>
</head>

<body>
<?php require("nav.php"); ?>



<div class="container">
    <div id="actor" class="well"></div>
</div>


<div class="container">
    <div class="jumbotron">
        <h3 class="text-center related">Related Movies</h3>
        <!--<form id="searchR">
            <input type="text" class="form-control" id="searchRelated" placeholder="Enter Movie Id:.">
        </form>-->
    </div>
</div>

<div class="container">
    <div id="actors" class="row"></div>
</div>




<!--jquery-->
<script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous"></script>
<!--axios npm-->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="js/main.js"></script>

<!--Run getMovie-->
<script>
    getActor();
</script>
</body>
</html>

