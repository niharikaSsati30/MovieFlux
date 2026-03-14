let lastMoviesHTML = "";
$(document).ready(function(){

   $("#searchForm").submit(function(e){

      let movieName = $("#searchText").val();

      getMovies(movieName);

      e.preventDefault();

   });

});

function getMovies(movieName){

   fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=7bc69dd8`)
   .then(res => res.json())
   .then(data => {

      let output = "";

      if(data.Search){

         data.Search.forEach(movie => {

   if(!movie.Poster || movie.Poster === "N/A" || movie.Poster === "null") return;

   output += `
<div class="movie-card">
   <img src="${movie.Poster}" 
        onerror="this.closest('.movie-card').remove()">

   <h3>${movie.Title}</h3>

   <button onclick="getMovieDetails('${movie.imdbID}')">
      Show Details
   </button>
</div>
`;

});
lastMoviesHTML = output;
         document.getElementById("movies").innerHTML = output;

      }else{
         document.getElementById("movies").innerHTML = "<h2>No Result</h2>";
      }

   });

}

function getMovieDetails(id){

   fetch(`https://www.omdbapi.com/?i=${id}&apikey=7bc69dd8`)
   .then(res => res.json())
   .then(movie => {
let output = `
   <button onclick="goBack()" class="back-btn">⬅ Go Back</button>

   <div class="movie-details">
      <img src="${movie.Poster}">
      <h2>${movie.Title}</h2>
      <p><b>Year:</b> ${movie.Year}</p>
      <p><b>Genre:</b> ${movie.Genre}</p>
      <p><b>Actors:</b> ${movie.Actors}</p>
      <p><b>Plot:</b> ${movie.Plot}</p>
   </div>
`;

      document.getElementById("movies").innerHTML = output;

   });

}
function goBack(){
   document.getElementById("movies").innerHTML = lastMoviesHTML;
}
