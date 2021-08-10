$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchMovie = $("#searchMovie").val();
    getMovies(searchMovie);
    e.preventDefault();

  });
});

$(document).ready(() => {
  $("#searchR").on("submit", (e) => {
    let searchRelated = $("#searchRelated").val();
    getRelated(searchRelated);
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

function getMoviesGenre(searchMovieGenre) {
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

function movieSelected(id) {
  //Set to broswer storage
  sessionStorage.setItem("movieId", id);
  //create new window with /movie.html at end
  window.location = "movie.php";
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



function getPopular(){

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

function getRelated(searchRelated){

  //axios.get('http://www.omdbapi.com?s='+ searchMovie+'&apikey=48d6917d')
  axios
      .get(

          "https://api.themoviedb.org/3/movie/"+ searchRelated + "/recommendations?api_key=1350e4528ff8559ef2b0fa6679f97d84&language=en-US&page=1"
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

function addMovie(){


}


//1350e4528ff8559ef2b0fa6679f97d84
