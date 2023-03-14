let direction = [
    new Director(1, "Lana Wachowski"),
    new Director(2, "Lilly Wachowski")
];

let cast = [
    new Actor(1, "Keanu Reeves"),
    new Actor(2, "Carrie-Anne Moss"),
    new Actor(3, "Laurence Fishburne"),
    new Actor(4, "Joe Pantoliano"),
    new Actor(5, "Hogo Weaving"),
    new Actor(6, "Antony Ray Parker")
];

let genre = "Action"
let sinopsis = "When a beautiful stranger (Carrie-Anne Moss) leads computer hacker Neo (Keanu Reeves) to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence."
let poster = "https://cdn.shopify.com/s/files/1/1416/8662/products/the_matrix_1999_fr_original_film_art.jpg?v=1640646540"

/* let film = new Film(
    1,
    "Matrix",
    1999,
    genre,
    102,
    sinopsis,
    poster,
    direction,
    cast,
    14,
    null
) */

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

