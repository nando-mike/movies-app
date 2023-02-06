(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object
    // with your team name in the "js/movies-api.js" file.
    "use strict";

// MOVIES ARRAY //
    let movies = await getMovies();
    console.log(movies);

// MAP ARRAY //
    let movieTitles = movies.map(function (obj) {
        return obj.title;
    });

    console.log(movieTitles);

    let movieIDs = movies.map(function(obj){
        return obj.id;
    });

    console.log(movieIDs)

    let html = ``;


    const writeHtml = () => {

        for(let i = 0; i < movies.length; i += 1){
            html += `<div class="card col-3 mt-3 p-3 d-flex flex-column this-item movie-card" data-movie-id="${movieIDs[i]}" data-movie-title="${movies[i].title}" data-movie-year="${movies[i].year}" data-movie-genre="${movies[i].genre}" data-movie-director="${movies[i].director}">
  <div class="card-body">
    <h3 class="card-title">${movies[i].title}</h3>
    <p class="card-title">${movies[i].director}</p>
    <p class="card-title">Year: ${movies[i].year}</p>
    <p class="card-title">Genre: ${movies[i].genre}</p>
  </div>
<button class="button del-item" data-btn="${movieIDs[i]}">
Delete
</button>
<button class="button up-item" data-btn="${movieIDs[i]}">
Update
</button>
</div>`

        }

        $(`#movies-here`).html(html);
    }

    await writeHtml();

    // end of page load

    // let delBtnHtml=`<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                 Delete a Movie
    //             </button>`
    // let delItemsHtml=``;
    //
    // movies.forEach(function(movie){
    //     delItemsHtml +=`<li class="del-item" data-movie-id="${movie.id}">${movie.title}</li>`
    // })
    //
    // $(`#delete-menu-here`).html(`${delBtnHtml}<ul class="dropdown-menu">${delItemsHtml}</ul>`);

    $(document).on(`click`, `.del-item`, async (e) => {
        let currentID = $(e.target).parent(`.this-item`).attr(`data-movie-id`)
        console.log(e);
        // $(`.del-item`).attr(`data-btn`);
        console.log(currentID);
        await deleteMovie({
            id: currentID
        });
        location.reload();
    });

    let thisMovieID = ``;

    $(document).on(`click`, `.up-item`, async (e) => {
        thisMovieID = $(e.target).parent(`.this-item`).attr(`data-movie-id`);
        $(`.change-box`).toggleClass(`hidden`);
        console.log(thisMovieID);
    });

    $(document).on(`click`, `#changeMovie`, async (e) => {
        e.preventDefault();
        let title = $(`#newTitle`).val() === `` ? $(e.target).parent(`.this-item`).attr(`data-movie-title`) : $(`.newTitle`).val();
        let director = $(`#newDirector`).val() === `` ? $(e.target).parent(`.this-item`).attr(`data-movie-director`) : $(`.newDirector`).val();
        let year = $(`#newYear`).val() === `` ? $(e.target).parent(`.this-item`).attr(`data-movie-year`) : $(`.newYear`).val();
        let genre = $(`#newGenre`).val() === `` ? $(e.target).parent(`.this-item`).attr(`data-movie-genre`) : $(`.newGenre`).val();
        console.log(title)
        console.log(director)
        console.log(year)
        console.log(genre)
        await updateMovie({
            id: thisMovieID,
            title: title,
            director: director,
            year: year,
            genre: genre,
        });
        location.reload();
    });



})();

