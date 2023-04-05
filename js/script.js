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
let editing = "";

const favoriteInnerMethod = (id, film) => {
  if (localStorage.getItem(id)) {
    localStorage.removeItem(id);
  } else {
    film.favorite = true;
    localStorage.setItem(id, JSON.stringify(film));
  }
};

const getFormData = (edit, objectOnEdit) => {
  if (edit) {
    const setFormField = (tagId, insetValue) => {
      document.querySelector(`#${tagId}`).value = insetValue;
    };

    setFormField("newFormTitle", objectOnEdit.title);
    setFormField("newFormURL", objectOnEdit.poster);
    setFormField("newFormSinopsis", objectOnEdit.sinopsis);
    setFormField("newFormDirection", objectOnEdit.direction);
    setFormField("newFormCast", objectOnEdit.actors);
    setFormField("newFormYear", objectOnEdit.year);
    setFormField("newFormGenre", objectOnEdit.category);
    setFormField("newFormDuration", objectOnEdit.duration);
    setFormField("newFormRating", objectOnEdit.rating);

    listRender("newFilm");
  } else {
    const getFormField = (tagId) => {
      return document.querySelector(`#${tagId}`).value;
    };

    let formData = new Film();

    if (editing === "") {
      formData.id = "fake-" + (Math.floor(Math.random() * 10000000) + 1);
    } else {
      favoriteInnerMethod(editing);
      let tempId;
      try {
        tempId = editing.split("-");
      } catch (e) {
        console.log("Error: \n" + e);
      }
      if (tempId[1]) {
        editing = tempId[1];
      }
      formData.id = "fake-" + editing;
    }
    formData.title = getFormField("newFormTitle");
    formData.poster = getFormField("newFormURL");
    formData.sinopsis = getFormField("newFormSinopsis");
    formData.direction = getFormField("newFormDirection").split(",");
    formData.actors = getFormField("newFormCast").split(",");
    formData.year = getFormField("newFormYear");
    formData.category = getFormField("newFormGenre").split(",");
    formData.rating = getFormField("newFormRating");
    formData.duration = getFormField("newFormDuration");

    return formData;
  }
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
  editing = "";
  newFilmBtn.style.display = "none";
  if (lastSearch.length === 0) {
    filmsList.innerHTML = "";
    newFilmDiv.style.display = "none";
    listRender();
  } else {
    listFilms(lastSearch);
    lastSearch = new Array();
  }
  return false;
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

let filmDetails = async (id, store) => {
  editing = id;
  const showEdit = (editId) => {
    if (!document.querySelector(`#fav-${editId}`).checked) {
      document.querySelector("#editCard").style.display = "none";
    } else {
      document.querySelector("#editCard").style.display = "grid";
    }
  };
  const getInnerCard = (isFavorite) => {
    let bool = film.favorite == true ? true : false;
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
        favorite: bool,
      })
    );
    showEdit(id);
    filmsList.style.display = "none";
    showFilm.style.display = "flex";
  };

  let film = new Film();
  let localFilm = new Film();
  let prefix = id.split("-");

  if (prefix[0] == "fake") {
    if (!store) {
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
      film.favorite = localFilm.favorite;

      getInnerCard(localFilm.favorite);
    } else {
      favoriteInnerMethod(id, film);
    }
  } else {
    if (localStorage.getItem("fake-" + id)) {
      favoriteInnerMethod("fake-" + id);
    }
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

        if (!store) {
          getInnerCard();
        } else {
          favoriteInnerMethod(id, film);
        }
      });
  }
};

const editFilm = () => {
  try {
    let filmOnEdit = localStorage.getItem(editing);
    filmOnEdit = JSON.parse(filmOnEdit);
    getFormData(true, filmOnEdit);
  } catch (e) {
    console.log("Error: \n");
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
    film.favorite = filmTest.favorite;

    favFilms.push(film);
  });
  listFilms(favFilms);
  newFilmBtn.style.display = "flex";
  return false;
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
