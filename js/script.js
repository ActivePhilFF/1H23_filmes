let btnSearchFilm = document.querySelector("#btn-search-film");
let inputSearchFilm = document.querySelector("#input-search-film");

btnSearchFilm.onclick = () => {
    console.log(inputSearchFilm.value.length)
    if (inputSearchFilm.value.length > 0) {
        let films = new Array();
        fetch("http://www.omdbapi.com/?apikey=ed5e5ad5&s=" + inputSearchFilm.value)
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
            listFilms.appendChild(await film.getCard());
        })
    }
}

