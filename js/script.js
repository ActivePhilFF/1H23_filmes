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
  let formData = new Film();

  formData.id = "fake-" + (Math.floor(Math.random() * 10000000) + 1);
  formData.title = getFormField("newFormTitle");
  formData.poster = getFormField("newFormURL");
  formData.sinopsis = getFormField("newFormSinopsis");
  formData.direction = getFormField("newFormDirection").split(",");
  formData.actors = getFormField("newFormCast").split(",");
  formData.year = getFormField("newFormYear");
  formData.category = getFormField("newFormGenre").split(",");
  formData.rating = getFormField("newFormRating");
  formData.duration = "Unknown";

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
    newFilmDiv.style.display = "none";
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
  const getInnerCard = () => {
    showFilm.appendChild(
      film.getDetailedCard({
        title: film.title,
        url: film.poster,
        year: film.year,
        category: film.category,
        sinopsis: film.sinopsis,
        direction: film.direction,
        actors: film.actors,
        duration: film.duration,
        rating: film.rating,
      })
    );
    filmsList.style.display = "none";
    showFilm.style.display = "flex";
  };

  const favoriteInnerMethod = () => {
    if (localStorage.getItem(id)) {
      localStorage.removeItem(id);
    } else {
      localStorage.setItem(id, JSON.stringify(film));
    }
  };

  let film = new Film();
  let localFilm = new Film();
  let prefix = id.split("-");

  if (prefix[0] == "fake") {
    if (!favorite) {
      localFilm = JSON.parse(localStorage.getItem(id));
      film.id = localFilm.id;
      film.title = localFilm.title;
      film.year = localFilm.year;
      film.category = localFilm.category;
      film.duration = localFilm.duration;
      film.sinopsis = localFilm.sinopsis;
      film.poster = localFilm.poster;
      film.direction = localFilm.direction;
      film.actors = localFilm.actors;
      film.rating = localFilm.rating;
      film.review = localFilm.review;

      getInnerCard();
    } else {
      favoriteInnerMethod();
    }
  } else {
    fetch(http + "://www.omdbapi.com/?apikey=ed5e5ad5&i=" + id)
      .then((resp) => resp.json())
      .then((resp) => {
        film.id = resp.imdbID;
        film.title = resp.Title;
        film.year = resp.Year;
        film.category = resp.Genre.split(",");
        film.duration = resp.Runtime;
        film.sinopsis = resp.Plot;
        film.poster = resp.Poster;
        film.direction = resp.Director;
        film.actors = resp.Actors.split(",");
        film.rating = resp.imdbRating;
        film.review = resp.Awards;

        if (!favorite) {
          getInnerCard();
        } else {
          favoriteInnerMethod();
        }
      });
  }
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
  return false
};

btnSearchFilm.onclick = () => {
  useAPI();
};

newFilmForm.onsubmit = () => {
  let newFilm = getFormData();
  localStorage.setItem(newFilm.id, JSON.stringify(newFilm));
  getFavorites();
  return false;
};
