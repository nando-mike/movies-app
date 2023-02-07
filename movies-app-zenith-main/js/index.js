(async () => {

    "use strict";

// MOVIES ARRAY //
    let movies = await getMovies();
    console.log(movies);

// MAP ARRAY //
    let movieTitles = movies.map(function (obj) {
        return obj.title;
    });

    console.log(movieTitles);

    let movieIDs = movies.map(function (obj) {
        return obj.id;
    });

    console.log(movieIDs);

// LOOP THAT GETS POSTERS FROM API //
    let moviePosters = [];
    const getThePosters = async () => {
        for (let i = 0; i < movieTitles.length; i += 1) {
            await $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + `${movieTitles[i]}` + "&callback=?", function (json) {
                let posterData = '';
                if (json != "Nothing found.") {
                    // console.log(json.results[0].poster_path);
                    posterData = json.results[0].poster_path;
                    moviePosters.push(posterData);
                }
            });
        }
    }

    await getThePosters();
    console.log(moviePosters)

    let html = ``;


    const writeHtml = () => {

        for (let i = 0; i < movies.length; i += 1) {
            html += `<div class="card mt-3 p-3 d-flex flex-column this-item movie-card" data-movie-id="${movieIDs[i]}" data-movie-title="${movies[i].title}" data-movie-year="${movies[i].year}" data-movie-genre="${movies[i].genre}" data-movie-director="${movies[i].director}">
  <div class="card-body">
  <img src="http://image.tmdb.org/t/p/w500/${moviePosters[i]}" class="poster" alt="current movie poster">
    <h3 class="card-title mt-3">${movies[i].title}</h3>
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
    // END OF PAGE LOAD //

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

    $(document).on(`click`, `#newMovie`, async (e) => {
        e.preventDefault();
        let title = $(`#title`).val();
        let director = $(`#director`).val();
        let year = $(`#year`).val();
        let genre = $(`#genre`).val();
        console.log(title)
        console.log(director)
        console.log(year)
        console.log(genre)
        await addMovie({
            title: title,
            director: director,
            year: year,
            genre: genre
        });
        location.reload();
    })


})();

