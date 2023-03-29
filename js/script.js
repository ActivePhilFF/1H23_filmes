const http = "https"; /*to easily change between http and https when needed*/

const btnSearchFilm = document.querySelector("#btn-search-film");
const inputSearchFilm = document.querySelector("#input-search-film");
const filmsList = document.querySelector("#films-list");
const newFilmDiv = document.querySelector("#new-film-div");
const newFilmForm = document.querySelector("#new-film-form");
const newFilmBtn = document.querySelector("#new-film-button");
const showFilm = document.querySelector("#show-film");
const closeBtn = document.querySelector("#closeCard");
let lastSearch = new Array();

const getFormData = () => {
  const getFormField = (id) => {
    return document.querySelector(`#${id}`).value;
  };
  let formData = {};

  formData.id = "fakeID";
  formData.title = getFormField("newFormTitle");
  formData.poster = getFormField("newFormURL");
  formData.sinopsis = getFormField("newFormSinopsis");
  formData.direction = getFormField("newFormDirection");
  formData.cast = getFormField("newFormCast");
  formData.year = getFormField("newFormYear");
  formData.genre = getFormField("newFormGenre");
  formData.rating = getFormField("newFormRating");

  return formData;
};
const listRender = (param) => {
  if (param === "newFilm") {
    newFilmDiv.style.display = "grid";
    newFilmBtn.style.display = "none";
    filmsList.style.display = "none";
    showFilm.style.display = "none";
    showFilm.innerHTML = "";
  } else {
    filmsList.style.display = "flex";
    showFilm.style.display = "none";
    showFilm.innerHTML = "";
  }
};

const getHome = () => {
  newFilmBtn.style.display = "none";
  if (lastSearch.length === 0) {
    filmsList.innerHTML = "";
    newFilmDiv.style.display = "none";
    listRender();
  } else {
    listFilms(lastSearch);
    lastSearch = new Array();
  }
};

const useAPI = () => {
  if (inputSearchFilm.value.length > 0) {
    lastSearch = new Array();
    listRender();
    let films = new Array();
    fetch(
      http + "://www.omdbapi.com/?apikey=ed5e5ad5&s=" + inputSearchFilm.value
    )
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
          lastSearch.push(film);
        });
        listFilms(films);
      });
  }
  return false;
};

let listFilms = async (films) => {
  listRender();
  let divToFill = document.querySelector("#films-list");
  divToFill.innerHTML = "";
  divToFill.style.display = "flex";

  if (films.length > 0) {
    films.forEach(async (film) => {
      divToFill.appendChild(await film.getCard());
      film.getDetailsBtn().onclick = () => {
        filmDetails(film.id);
      };
      if (localStorage.getItem(film.id)) {
        film.getFavSwitch().setAttribute("checked", true);
      }
      film.getFavSwitch().onclick = () => {
        filmDetails(film.id, true);
      };
    });
  }
};

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
      );

      if (!favorite) {
        showFilm.appendChild(
          film.getDetailedCard({
            title: film.title,
            url: film.poster,
            year: film.year,
            genre: film.category,
            sinopsis: film.sinopsis,
            direction: film.direction,
            actors: film.actors,
            duration: film.duration,
            rating: film.rating,
          })
        );
        filmsList.style.display = "none";
        favList.style.display = "none";
        showFilm.style.display = "flex";
      } else {
        if (localStorage.getItem(id)) {
          localStorage.removeItem(id);
        } else {
          localStorage.setItem(id, JSON.stringify(film));
        }
      }
    });
};

let getFavorites = () => {
  let favFilms = new Array();
  let entries = Object.entries(localStorage);
  entries.forEach((item) => {
    let filmTest = JSON.parse(localStorage.getItem(item[0]));
    let film = new Film();
    film.id = filmTest.id;
    film.title = filmTest.title;
    film.year = filmTest.year;
    film.poster = filmTest.poster;

    favFilms.push(film);
  });
  listFilms(favFilms);
  newFilmBtn.style.display = "flex";
};

const saveToLocalStorage = (newFilm) => {
  let film = new Film();
  film.id = newFilm.id;
  film.title = newFilm.title;
  film.poster = newFilm.poster;
  film.year = newFilm.year;
  film.direction = newFilm.direction;
  film.sinopsis = newFilm.sinopsis;
  film.actors = newFilm.cast;
  film.genre = newFilm.genre;
  film.rating = newFilm.rating;

  console.log(film);
  localStorage.setItem(film.id, JSON.stringify(film));
};

btnSearchFilm.onclick = () => {
  useAPI();
};

newFilmForm.onsubmit = () => {
  let newFilm = getFormData();
  saveToLocalStorage(newFilm);
  return false;
};

/* newFilmFormBtn.onclick = () =>
console.log("The code ran!")
 */
//useAPI("filmsList")
