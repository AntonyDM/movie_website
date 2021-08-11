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
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <h5>${movie.title}</h5>
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
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img class="actorprofile" src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
                          <h5>${actor.name}</h5>
                          <a onclick="actorSelected('${actor.id}')" class="btn btn-primary" href="#">Movie Details</a>
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
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img alt="image is not available" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                          <h5>${show.name}</h5>
                          <a onclick="tvSelected('${show.id}')" class="btn btn-primary" href="#">Movie Details</a>
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
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail movieposter">
                        </div>
                        <div class="col-md-8">
                            <h2 class="movietitle">${movie.title}</h2>
                            <ul class="list-group">
                               <!--Two Genres-->
                              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}/10</li>
                              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                            </ul>
                            <div class="plot">
                              <h3>Plot</h3>
                              ${movie.overview}
                             </div>
                             <div class="buttons">
                                <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                                <a href="index.php" class="btn btn-default">Go Back To Search</a>
                                <a href="movielist.php" class="btn btn-default" onclick="addMovie();">Add to Movie List</a>
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
                          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <h5>${movie.title}</h5>
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
                            <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" class="movieposter thumbnail">
                        </div>
                        <div class="col-md-8">
                            <h2 class="movietitle">${actor.name}</h2>
                            <ul class="list-group">
                               <!--Two Genres-->
                              <li class="list-group-item"><strong>Born:</strong> ${actor.birthday}</li>
                              <li class="list-group-item"><strong>Born In: </strong> ${actor.place_of_birth}</li>
                              
                            </ul>
                            <div class="plot">
                              <h3>Biography</h3>
                              ${actor.biography}
                             </div>
                             <div class="buttons">
                                <a href="http://imdb.com/title/${actor.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                                <a href="index.php" class="btn btn-default">Go Back To Search</a>
                              
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

            $("#actor").html(output);
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
                          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <h5>${movie.title}</h5>
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
                            <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="thumbnail movieposter">
                        </div>
                        <div class="col-md-8">
                            <h2 class="movietitle">${show.name}</h2>
                            <ul class="list-group">
                               <!--Two Genres-->
                              <li class="list-group-item"><strong>Genre:</strong> ${show.genres[0].name}, ${show.genres[1].name}</li>
                              <li class="list-group-item"><strong>Released:</strong> ${show.first_air_date}</li>
                              <li class="list-group-item"><strong>Rated:</strong> ${show.vote_average}/10</li>
                            </ul>
                            <div class="plot">
                              <h3>Plot</h3>
                              ${show.overview}
                             </div>
                             <div class="buttons">
                                <a href="http://imdb.com/title/${show.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                                <a href="index.php" class="btn btn-default">Go Back To Search</a>
                                <a href="movielist.php" class="btn btn-default" onclick="addMovie();">Add to Movie List</a>
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
                          <img src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                          <h5>${show.name}</h5>
                          <a onclick="tvSelected('${show.id}')" class="btn btn-primary" href="#">Movie Details</a>
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

function getPopularMovies(){

  axios
      .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
      )
      .then((response) => {
        console.log(response);
        //puts the array of movies into the variable
        let movies = response.data.results;
        let output = "";
        $.each(movies, (index, movie) => {
          output += `
                      <div class="col-md-3" >
                        <div class="well text-center">
                          <img class="movieposter" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                          <h5 class="title">${movie.title}</h5>
                           <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
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




//1350e4528ff8559ef2b0fa6679f97d84
