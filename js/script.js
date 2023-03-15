let http = "https"

let btnSearchFilm = document.querySelector("#btn-search-film");
let inputSearchFilm = document.querySelector("#input-search-film");

btnSearchFilm.onclick = () => {
    if (inputSearchFilm.value.length > 0) {
        let films = new Array();
        fetch(http + "://www.omdbapi.com/?apikey=ed5e5ad5&s=" + inputSearchFilm.value)
            .then((resp) => resp.json())
            .then((resp) => {
                resp.Search.forEach((item) => {
                    let film = new Film(
                        item.imdbID,
                        item.Title,
                        item.Year,
                        null,
                        null,
                        null,
                        item.Poster,
                        null,
                        null,
                        null,
                        null
                    );
                    films.push(film);
                });
                listFilms(films)

            })

    }
    return false;
}

let listFilms = async (films) => {
    let listFilms = await document.querySelector("#films-list");
    listFilms.innerHTML = "";
    if (films.length > 0) {
        films.forEach(async (film) => {
            console.log(film)
            listFilms.appendChild(await film.getCard());
            film.getDetailsBtn().onclick = () => {
                filmDetails(film.id)
            }
        })
    }
}

let filmDetails = async (id) => {
    fetch(http + "://www.omdbapi.com/?apikey=ed5e5ad5&i=" + id)
        .then((resp) => resp.json())
        .then((resp) => {
            console.clear()
            console.log(resp)
            //document.querySelector("#films-list").setAttribute("hidden", "true")
            //instance object of Film Class

            // Call method for generating card with film details

            // Hide div #films-list
        });
}