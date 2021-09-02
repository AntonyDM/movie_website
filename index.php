


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

            <!--Displays current popular movies-->
            <h3 class="text-center title">Current Popular Movies</h3>
            <div class="container">
                <div id="indexmovies" class="row"</div>
            </div>

            <br>

            <!--Displays current popular shows-->
            <h3 class="text-center title">Current Popular TV Shows</h3>
            <div class="container">
                <div id="indexshows" class="row"</div>
            </div>

            <!--jquery-->
            <script
                    src="https://code.jquery.com/jquery-3.6.0.min.js"
                    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                    crossorigin="anonymous"></script>
            <!--axios npm-->
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="js/main.js"></script>


            <!--Gets current popular movies-->
            <script>
                indexgetPopularMovies();
                indexgetPopularTVs();
            </script>

        </body>
</html>
