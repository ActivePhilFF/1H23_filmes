let http = "https"

let btnSearchFilm = document.querySelector("#btn-search-film");
let inputSearchFilm = document.querySelector("#input-search-film");
let filmsList = document.querySelector("#films-list")
let showFilm = document.querySelector("#show-film")
let closeBtn = document.querySelector("#closeCard")

const unhideMainDiv = () => {
    filmsList.style.display = "flex"
    showFilm.style.display = "none"
    showFilm.innerHTML = ""
}

const useAPI = () => {
    if (inputSearchFilm.value.length > 0) {
        filmsList.innerHTML = "";
        unhideMainDiv()
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
        .then(async (resp) => {
            //instance object of Film Class
            let film = new Film(
                resp.imdbID,
                resp.Title,
                resp.Year,
                resp.Genre.split(","),
                resp.Runtime,
                resp.Plot,
                resp.Poster,
                resp.Director,
                resp.Actors.split(","),
                resp.imdbRating,
                resp.Awards
            )

            document.querySelector("#show-film").appendChild(await film.getDetailedCard({
                title: film.title,
                url: film.poster,
                year: film.year,
                genre: film.category,
                sinopsis: film.sinopsis,
                direction: film.direction,
                actors: film.actors,
                duration: film.duration,
                rating: film.rating
            }))
            filmsList.style.display = "none"
            showFilm.style.display = "flex"

            // Call method for generating card with film details

            // Hide div #films-list
        });
}

btnSearchFilm.onclick = () => { useAPI() }