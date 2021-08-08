


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
        <?php require("search.php"); ?>
        <div class="container">
            <div id="movies" class="row"</div>
        </div>
        <!--jquery-->
        <script
                src="https://code.jquery.com/jquery-3.6.0.min.js"
                integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                crossorigin="anonymous"></script>
        <!--axios npm-->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="js/main.js"></script>
        <script>
            getPopular();
        </script>
    </body>
