const http = "https" /*to easily change between http and https when needed*/

const btnSearchFilm = document.querySelector("#btn-search-film");
const inputSearchFilm = document.querySelector("#input-search-film");
const filmsList = document.querySelector("#films-list")
const showFilm = document.querySelector("#show-film")
const favList = document.querySelector("#favorite-films-list")
const closeBtn = document.querySelector("#closeCard")

const listRender = (param) => {
    if (param === "filmsList") {
        filmsList.style.display = "flex"
        showFilm.style.display = "none"
        favList.style.display = "none"
    }

    if (param === "favList") {
        filmsList.style.display = "none"
        showFilm.style.display = "none"
        favList.style.display = "flex"

    }
    showFilm.innerHTML = ""
}

const useAPI = (render) => {
    if (inputSearchFilm.value.length > 0) {
        if (render === "favList") {
            favList.innerHTML = ""
            listRender("favList")
        }
        if (render === "filmsList") {
            filmsList.innerHTML = "";
            listRender("filmsList")
        }
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
                listFilms(films, render)

            })
    }
    return false;

}

let listFilms = async (films, render) => {
    listRender(render)
    let divToFill = ""
    if (render === "filmsList") {
        divToFill = document.querySelector("#films-list");
    } else if (render === "favList") {
        divToFill = document.querySelector("#favorite-films-list");
    } else {
        divToFill = document.querySelector("#films-list");
    }

    divToFill.innerHTML = "";

    if (films.length > 0) {
        films.forEach(async (film) => {
            divToFill.appendChild(await film.getCard());
            film.getDetailsBtn().onclick = () => {
                filmDetails(film.id)
            }
            if (localStorage.getItem(film.id)) {
                film.getFavSwitch().setAttribute("checked", true)
            }
            film.getFavSwitch().onclick = () => {
                filmDetails(film.id, true)
            }
        })
    }
}

let filmDetails = async (id, favorite) => {
    fetch(http + "://www.omdbapi.com/?apikey=ed5e5ad5&i=" + id)
        .then((resp) => resp.json())
        .then((resp) => {

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

            if (!favorite) {
                document.querySelector("#show-film").appendChild(film.getDetailedCard({
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
                favList.style.display = "none"
                showFilm.style.display = "flex"

            } else {

                if (localStorage.getItem(id)) {
                    localStorage.removeItem(id)
                } else {
                    localStorage.setItem(id, JSON.stringify(film))
                }
            }
        });
}

let getFavorites = () => {
    let favFilms = new Array()
    let entries = Object.entries(localStorage)
    entries.forEach(item => {
        let filmTest = JSON.parse(localStorage.getItem(item[0]))
        let film = new Film()
        film.id = filmTest.id
        film.title = filmTest.title
        film.year = filmTest.year
        film.poster = filmTest.poster

        favFilms.push(film)
    });
    listFilms(favFilms, "favList")

}

btnSearchFilm.onclick = () => { useAPI("filmsList") }

//useAPI("filmsList") 