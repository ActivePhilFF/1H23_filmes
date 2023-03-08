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

let film = new Film(
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
)

let btnSearchFilm = document.querySelector("#btn-search-film");
let inputSearchFilm = document.querySelector("#input-search-film");

btnSearchFilm.onclick = () => {
    if (inputSearchFilm.value.length > 0) {
        fetch("http://www.omdbapi.com/?apikey=ed5e5ad5&s=" + inputSearchFilm.value, { mode: "no-cors" }).then((resp) => resp.json()).then((resp) => {
            console.log(resp);
        })
    }
    else {
        console.log("Nothing here")
    }
    return false;
}

getCard = () => {
    let card = document.createElement("div").setAttribute("class", "card");
    let imgCartaz = document.createElement("img").setAttribute("src", this.cartaz);
    imgCartaz.setAttribute("class", "card-img-top");
    let cardBody = document.createElement("dis").setAttribute("class", "card-body");
    let hCardTitle = document.createElement("h5").setAttribute("class", "card-title");
}