$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchMovie = $("#searchMovie").val();
    getMovies(searchMovie);
    e.preventDefault();

  });
});

$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchTV = $("#searchTV").val();
    getTVs(searchTV);
    e.preventDefault();

  });
});

$(document).ready(() => {
    $("#searchForm").on("submit", (e) => {
        let searchActor = $("#searchActor").val();
        getActors(searchActor);
        e.preventDefault();

    });
});



function getMovies(searchMovie) {
  //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&query=" + searchMovie
    )
    .then((response) => {
      console.log(response);
      //puts the array of movies into the variable
      let movies = response.data.results;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4">
                        <!--Makes the elements centered per column-->
                        <div class="well text-center">
                          <!--Movie Poster-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <!--Movie Title-->
                          <h5 class="text">${movie.title}</h5>
                          <!--Movie Details-->
                          <a onclick="movieSelected('${movie.id}')" class="btn btn-primary button" href="#">Movie Details</a>
                        </div>
                      </div>
                    `;
      });
      //prints the movies on the div with the class movies
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getActors(searchActor) {
    //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')
    axios
        .get(
            "https://api.themoviedb.org/3/search/person?api_key=1350e4528ff8559ef2b0fa6679f97d84&query=" + searchActor
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            let actors = response.data.results;
            let output = "";
            $.each(actors, (index, actor) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4">
                        <!--Makes the elements centered per column-->
                        <div class="well text-center">
                          <!--Actor Pic-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
                          <!--Actor Name-->
                          <h5 class="text">${actor.name}</h5>
                          <!--Actor Details-->
                          <a onclick="actorSelected('${actor.id}')" class="btn btn-primary button" href="#">Actor Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $("#actors").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getTVs(searchTV) {
    //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')m
    axios.get("https://api.themoviedb.org/3/search/tv?api_key=1350e4528ff8559ef2b0fa6679f97d84&query=" + searchTV )
        .then((response) => {
            console.log(response);
            //puts the array of shows into the variable
            let shows = response.data.results;
            let output = "";
            $.each(shows, (index, show) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4">
                        <!--Makes the elements centered per column-->
                        <div class="well text-center">
                          <!--Show Poster-->
                          <img class="poster" alt="image is not available" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                          <!--Show Title-->
                          <h5 class="text">${show.name}</h5>
                          <!--Movie Details-->
                          <a onclick="tvSelected('${show.id}')" class="btn btn-primary button" href="#">Show Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $("#shows").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
  //Set to broswer storage
  sessionStorage.setItem("movieId", id);
  //create new window with /movie.html at end
  window.location = "movie.php";
  return false;
}

function tvSelected(id) {
    //Set to broswer storage
    sessionStorage.setItem("showId", id);
    //create new window with /movie.html at end
    window.location = "tv.php";
    return false;
}

function actorSelected(id) {
    //Set to broswer storage
    sessionStorage.setItem("actorId", id);
    //create new window with /movie.html at end
    window.location = "actor.php";
    return false;
}

//indivudal movie page
function getMovie() {
  //Get movie ID from the session storage
  let movieId = sessionStorage.getItem("movieId");

  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=1350e4528ff8559ef2b0fa6679f97d84")
    .then(function (response) {
      console.log(response);
      //info for the movie found in data
      let movie = response.data;
      let output = `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail poster">
                        </div>
                        <div class="col-md-8">
                            <h2 class="movietitle">${movie.title}</h2>
                            <script>getMovieTrailer();</script>
                            
                            <div id="videos" class="row trailer"></div>
                            
                            <!--The calss list creates the gap between the vid and the list-->
                            <ul class="list-group list">
                               <!--Two Genres-->
                              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
                              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}/10</li>
                              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                            </ul>
                            <div class="plot">
                              <h3>Plot</h3>
                              ${movie.overview}
                             </div>
                             
                             <div class="buttons">
                                <a href="movieTitlePage.php" class="btn btn-primary">Go Back To Search</a>
                             </div>
                        </div>
                    </div>
                    
                    <br>
                    </div class="row">
                        <div class="well">
                            <hr>
                            
                        </div>
                    </div>  
                    
                `;

      $("#movie").html(output);

    })
    .catch((err) => {
      console.log(err);
    });



  //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')
  axios
      .get(

          "https://api.themoviedb.org/3/movie/"+ movieId + "/recommendations?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
      )
      .then((response) => {
        console.log(response);
        //puts the array of movies into the variable
        let movies = response.data.results;
        let output = "";
        $.each(movies, (index, movie) => {
          output += `
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <h5 class="text">${movie.title}</h5>
                          <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                      </div>
                    `;
        });
        //prints the movies on the div with the class movies
        $("#movies").html(output);
      })
      .catch((err) => {
        console.log(err);
      });

}

//indivudal actor page
function getActor() {
    //Get movie ID from the session storage
    let actorId = sessionStorage.getItem("actorId");

    axios.get("https://api.themoviedb.org/3/person/" + actorId + "?api_key=1350e4528ff8559ef2b0fa6679f97d84")
        .then(function (response) {
            console.log(response);
            //info for the movie found in data
            let actor = response.data;

            let output = `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" class="poster thumbnail">
                        </div>
                        <div class="col-md-8">
                            <h2 class="movietitle">${actor.name}</h2>
                            <ul class="list-group">
                               <!--Two Genres-->
                              <li class="list-group-item"><strong>Born:</strong> ${actor.birthday}</li>
                              <li class="list-group-item"><strong>Born In: </strong> ${actor.place_of_birth}</li>
                              
                            </ul>
                            <div class="biography">
                              <h3>Biography</h3>
                              ${actor.biography}
                             </div>
                             <div class="buttons">
                                <a href="actorPage.php" class="btn btn-primary">Go Back To Search</a>
                              
                             </div>
                        </div>
                    </div>
                    
                    <br>
                    </div class="row">
                    
                        <div class="well">
                            <hr>
                            
                        </div>
                    </div>  
                    
                    <!--Title-->
                    <div class="container">
                        <div class="jumbotron">
                            <h3 class="text-center related">Related Movies</h3>
                        </div>
                    </div>

                    <!--List of Movies-->
                    <div class="container">                              
                        <div id="actorsmovies" class="row"></div>
                    </div>
                    
                    <!--Title-->
                    <div class="container">
                        <div class="jumbotron">
                            <h3 class="text-center related">Related Shows</h3>
                        </div>
                    </div>

                    <!--List of Shows-->
                    <div class="container">                              
                        <div id="actorsshows" class="row"></div>
                    </div>
                    
                    
                    <script>
                        actorMovies();
                        actorTVs();
                    </script>
                `;

            $("#actor").html(output);
        })
        .catch((err) => {
            console.log(err);
        });



}

//indivudal tv page
function getTV() {
    //Get movie ID from the session storage
    let showId = sessionStorage.getItem("showId");

    axios.get("https://api.themoviedb.org/3/tv/" + showId + "?api_key=1350e4528ff8559ef2b0fa6679f97d84")
        .then(function (response) {
            console.log(response);
            //info for the movie found in data
            let show = response.data;

            let output = `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="thumbnail poster">
                        </div>
                        <div class="col-md-8">
                            <h2 class="movietitle">${show.name}</h2>
                            
                            <script>getTVTrailer();</script>
                            
                            <div id="videos" class="row trailer"></div>
                            
                            <!--The calss list creates the gap between the vid and the list-->
                            <ul class="list-group list">
                               <!--Two Genres-->
                              <li class="list-group-item"><strong>Genre:</strong> ${show.genres[0].name}</li>
                              <li class="list-group-item"><strong>Released:</strong> ${show.first_air_date}</li>
                              <li class="list-group-item"><strong>Rated:</strong> ${show.vote_average}/10</li>
                              <li class="list-group-item"><strong>Number of Episodes:</strong> ${show.number_of_episodes}</li>
                            </ul>
                            
                            <div class="plot">
                              <h3>Plot</h3>
                              ${show.overview}
                             </div>
                             
                             <div class="buttons">
                                <a href="tvTitlePage.php" class="btn btn-primary">Go Back To Search</a>
                             </div>
                        </div>
                    </div>
                    
                    <br>
                    </div class="row">
                        <div class="well">
                            <hr>
                            
                        </div>
                    </div>  
                    
                `;
            /*#show is the results from response.data*/
            $("#show").html(output);
        })
        .catch((err) => {
            console.log(err);
        });


    axios
        .get(

            "https://api.themoviedb.org/3/tv/"+ showId + "/recommendations?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            let shows = response.data.results;
            let output = "";
            $.each(shows, (index, show) => {
                output += `
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                          <h5 class="text">${show.name}</h5>
                          <a onclick="tvSelected('${show.id}')" class="btn btn-primary" href="#">Show Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $("#shows").html(output);
        })
        .catch((err) => {
            console.log(err);
        });

}

//Get Popular Movies for Movie page
function getPopularMovies(){

  //Get the api data
  axios
      .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
      )
      .then((response) => {
        console.log(response);
        //puts the array of movies into the variable
        // The slice only shows the first 4 results
        //The final result will be called #movies
        let movies = response.data.results;
        let output = "";
        $.each(movies, (index, movie) => {
          output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4" >
                        <!--Makes the elements centered per column-->
                        <div class="well text-center">
                          <!--Movie Poster-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <!--Movie Title-->
                          <h5 class="text">${movie.title}</h5>
                          <!--Movie Details-->
                          <a onclick="movieSelected('${movie.id}')" class="btn btn-primary button" href="#">Movie Details</a>
                        </div>
                      </div>
                    `;
        });
        //prints the movies on the div with the class movies
        $('#movies').html(output);
      })
      .catch(function (error) {
        console.log(error);
      });


}

//Get Popular movies for Index page
function indexgetPopularMovies(){

    //Get the api data
    axios
        .get(
            "https://api.themoviedb.org/3/movie/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            //The slice only shows the first 4 results
            //The final result will be called #movies
            let indexmovies = response.data.results.slice(0,4);
            let output = "";
            $.each(indexmovies, (index, movie) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4" >
                        <!--Makes the elements centered per column-->
                        <div class="well text-center index">
                          <!--Movie Poster-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <!--Movie Title-->
                          <h5 class="text">${movie.title}</h5>
                          <!--Movie Details-->
                          <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $('#indexmovies').html(output);
        })
        .catch(function (error) {
            console.log(error);
        });


}

//Get TV for TV page
function getPopularTVs(){

    //Get the api data
    axios
        .get(
            "https://api.themoviedb.org/3/tv/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            // The slice only shows the first 4 results
            //The final result will be called #movies
            let shows = response.data.results;
            let output = "";
            $.each(shows, (index, show) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4" >
                        <!--Makes the elements centered per column-->
                        <div class="well text-center">
                          <!--TV Poster-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                          <!--TV Title-->
                          <h5 class="text">${show.name}</h5>
                          <!--Show Details-->
                          <a onclick="tvSelected('${show.id}')" class="btn btn-primary button" href="#">Show Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $('#shows').html(output);
        })
        .catch(function (error) {
            console.log(error);
        });


}

//Get Popular movies for Index page
function indexgetPopularTVs(){

    //Get the api data
    axios
        .get(
            "https://api.themoviedb.org/3/tv/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            //The slice only shows the first 4 results
            //The final result will be called #movies
            let indexshows = response.data.results.slice(0,4);
            let output = "";
            $.each(indexshows, (index, show) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4" >
                        <!--Makes the elements centered per column-->
                        <div class="well text-center index">
                          <!--Movie Poster-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                          <!--Movie Title-->
                          <h5 class="text">${show.name}</h5>
                          <!--Movie Details-->
                          <a onclick="tvSelected('${show.id}')" class="btn btn-primary" href="#">Show Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $('#indexshows').html(output);
        })
        .catch(function (error) {
            console.log(error);
        });


}

//Get Popular actors for Index page
function indexgetPopularActors(){

    //Get the api data
    axios
        .get(
            "https://api.themoviedb.org/3/person/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            //The slice only shows the first 4 results
            let indexactors = response.data.results.slice(0,4);
            let output = "";
            $.each(indexactors, (index, actor) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4" >
                        <!--Makes the elements centered per column-->
                        <div class="well text-center index">
                          <!--Movie Poster-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
                          <!--Movie Title-->
                          <h5 class="text">${actor.name}</h5>
                          <!--Movie Details-->
                          <a onclick="actorSelected('${actor.id}')" class="btn btn-primary" href="#">Actor Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class indexactors
            $('#indexactors').html(output);
        })
        .catch(function (error) {
            console.log(error);
        });


}

//Get TV for TV page
function getPopularActors(){

    //Get the api data
    axios
        .get(
            "https://api.themoviedb.org/3/person/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            // The slice only shows the first 4 results
            //The final result will be called #movies
            let actors = response.data.results;
            let output = "";
            $.each(actors, (index, actor) => {
                output += `
                      <!--Puts into the bootstrap column of 4-->
                      <div class="col-md-4" >
                        <!--Makes the elements centered per column-->
                        <div class="well text-center">
                          <!--Actor Pic-->
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
                          <!--Actor Name-->
                          <h5 class="text">${actor.name}</h5>
                          <!--Actor Details-->
                          <a onclick="actorSelected('${actor.id}')" class="btn btn-primary button" href="#">Actor's Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $('#actors').html(output);
        })
        .catch(function (error) {
            console.log(error);
        });


}

function getMovieTrailer(){
    let movieId = sessionStorage.getItem("movieId");

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            let videos = response.data.results.filter(v => v.type === "Trailer").slice(0,1);
            let output = "";
            $.each(videos, (index, video) => {
                output += `
                          <div class="col-md-4">
                            <div class="well text-center">
                                <iframe width="420" height="315" class="video"
                                    src="https://www.youtube.com/embed/${video.key}">
                                    <h5>${video.type}</h5>
                                </iframe>
                            </div>
                          </div>
                        `;
            });
            //prints the movies on the div with the class movies
            $("#videos").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getTVTrailer(){
    let showId = sessionStorage.getItem("showId");

    axios.get("https://api.themoviedb.org/3/tv/" + showId + "/videos?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US")
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            let videos = response.data.results.filter(v => v.type === "Trailer").slice(0,1);
            let output = "";
            $.each(videos, (index, video) => {
                output += `
                          <div class="col-md-4">
                            <div class="well text-center">
                                <iframe width="420" height="315" class="video"
                                    src="https://www.youtube.com/embed/${video.key}">
                                    <h5>${video.type}</h5>
                                </iframe>
                            </div>
                          </div>
                        `;
            });
            //prints the movies on the div with the class movies
            $("#videos").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function actorMovies(){
    let actorId = sessionStorage.getItem("actorId");
    //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')
    axios
        .get(

            "https://api.themoviedb.org/3/person/"+ actorId + "/movie_credits?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            let actorsmovies = response.data.cast.slice(0,4);
            let output = "";
            $.each(actorsmovies, (index, actor) => {
                output += `
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${actor.poster_path}">
                          <h5 class="text">${actor.title}</h5>
                          <a onclick="movieSelected('${actor.id}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $("#actorsmovies").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function actorTVs(){
    let actorId = sessionStorage.getItem("actorId");
    //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')
    axios
        .get(

            "https://api.themoviedb.org/3/person/"+ actorId + "/tv_credits?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
        )
        .then((response) => {
            console.log(response);
            //puts the array of movies into the variable
            let actorsshows = response.data.cast.slice(0,4);
            let output = "";
            $.each(actorsshows, (index, actor) => {
                output += `
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img class="poster" src="https://image.tmdb.org/t/p/w500${actor.poster_path}">
                          <h5 class="text">${actor.name}</h5>
                          <a onclick="tvSelected('${actor.id}')" class="btn btn-primary" href="#">Show Details</a>
                        </div>
                      </div>
                    `;
            });
            //prints the movies on the div with the class movies
            $("#actorsshows").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
//1350e4528ff8559ef2b0fa6679f97d84
