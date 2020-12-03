// var key = 'http: //www.omdbapi.com/?i=tt3896198&apikey=14736860';
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();

        getMovies(searchText);
        // searchText.prop("disabled", true).text("searching...");
        e.preventDefault();

    });

});

function getMovies(searchText) {
    // console.log(searchText);
    // axios.get('http://www.omdbapi.com?s=' + searchText)
    // axios.get('http://www.omdbapi.com/?s=tt3896198&apikey=14736860&' + searchText)
    axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=14736860')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;

            let output = '';
            // movie.title
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                   <div class="well text-center">
                    <img src="${movie.Poster}">
                      <h5 class="text-lg mt-3">${movie.Title}</h5>
                      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary appearance-none mt-3" href="#" id="detailButton">Movie Details</a>
                   </div> 
                </div>
                `;
            });
            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        });

}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let moveId = sessionStorage.getItem('movieId');
    // axios.get('http://www.omdbapi.com?i=' + moveId)
    // axios.get('http://www.omdbapi.com?i=tt3896198&apikey=14736860&' + moveId)
    axios.get('http://www.omdbapi.com/?i=' + moveId + '&apikey=14736860')

    .then((response) => {
            console.log(response);
            let movie = response.data
            let output = `
            <div class="row>
                 <div class="col-md-4>
                    <img src="${movie.Poster}" class="thumbnail" style="width:300px">
                
                </div>
                <div class="col-md-8" style="margin-left:-15px;"> 
                    <h2 class="mt-4 mb-3 text-2xl">${movie.Title}</h2>
                    <ul class="list-group mt-3>
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        
                    </ul>
                </div>
            </div>
            <div class="row>
               <div class="well>
                  <h3 class="mt-3 mb-3 font-bold">Plot</h3>
                  ${movie.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary appearance-none mb-3 mt-3">View IMDB</a>
                  <a href="index.html" class="btn  bg-success text-white appearance-none mb-3 mt-3">Go Back To Search</a>
                  
               </div>
            </div>
            `;
            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);
        });


}
// <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
// <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
// <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
// <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
// <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
// <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>