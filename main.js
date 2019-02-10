$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    $('#moviesList').css('display','none');
    $('#moviesBlock').css('display','block');
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });

  $('#ViewMovieList').on('click',function(){
    $('#moviesList').css('display','block');
    $('#moviesBlock').css('display','none');
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=3ca7d4cc')
    .then((response) => {
      // console.log(response);
      let movies = response.data.Search;
      // console.log(movies);
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <h5>${movie.Year}</h5>
              <a onclick="movieAdd('${movie.imdbID}','${movie.Title}','${movie.Year}','${movie.Poster}')" class="btn btn-primary" href="javascript:void(0);">Add to Library</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      // console.log(err);
    });
}

function movieAdd(mov_id,mov_title,mov_year,mov_poster){
  $('#success_msg').html("Movie added to your Library successfully.").show()
    setTimeout(function(){
      $('#success_msg').fadeOut();
  },2000);

  let output =`
        <tr class="table-active">
          <td>${mov_title}</td>
          <td>${mov_year}</td>
          <td><img src="${mov_poster}" class="thumbnail" style="height:100px; width:100px"></td>
          <td><input type="button" onclick="movieDel()" value="Delete"></td>
        </tr>
      `;

      $('table tbody').append(output);
}

function movieDel(){
  var td = event.target.parentNode; 
  var tr = td.parentNode; 
  tr.parentNode.removeChild(tr);
}

