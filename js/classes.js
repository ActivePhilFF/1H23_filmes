class Actor {
    constructor(id, name) {
        this.name = name;
        this.id = id;
    }
}

class Director {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Film {
    constructor(id, title, year, category, duration, sinopsis, poster, direction, actors, rating, review, btnDetails, favSwitch) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.category = category;
        this.duration = duration;
        this.sinopsis = sinopsis;
        this.poster = poster;
        this.direction = direction;
        this.actors = actors;
        this.rating = rating;
        this.review = review;
        this.btnDetails = null;
        this.favSwitch = null;
    }

    getCard = async () => {
        let card = document.createElement("div");
        let imgPoster = document.createElement("img");
        let cardBody = document.createElement("div")
        let hCardTitle = document.createElement("h5")
        let divDetails = document.createElement("div");
        let divGenre = document.createElement("div");
        let divYear = document.createElement("div");
        let divRating = document.createElement("div");
        let divSwitch = document.createElement("div");
        let favLabel = document.createElement("label") /*Extra stuff*/

        card.setAttribute("class", "card");
        imgPoster.setAttribute("class", "card-img-top");
        imgPoster.setAttribute("src", this.poster);
        cardBody.setAttribute("class", "card-body");
        hCardTitle.setAttribute("class", "card-title");
        divDetails.setAttribute("class", "display:flex; justify-content:space-around");
        divGenre.setAttribute("style", "flex-grow:1");
        divYear.setAttribute("style", "flex-grow:1");
        divRating.setAttribute("style", "flex-grow:1");
        divSwitch.setAttribute("class", "form-check form-switch")
        favLabel.setAttribute("class", "form-check-label") /*Extra stuff*/
        favLabel.setAttribute("for", "flexSwitchCheckDefault") /*Extra stuff*/
        favLabel.appendChild(document.createTextNode("Favorite")) /*Extra stuff*/

        hCardTitle.appendChild(document.createTextNode(this.title))
        divGenre.appendChild(document.createTextNode(this.genre))
        divYear.appendChild(document.createTextNode(this.year))
        divRating.appendChild(document.createTextNode(this.rating))
        divDetails.appendChild(divGenre);
        divDetails.appendChild(divYear);
        divDetails.appendChild(divRating);
        card.appendChild(imgPoster);
        card.appendChild(cardBody);
        cardBody.appendChild(hCardTitle)
        cardBody.appendChild(divDetails);

        this.setFavSwitch();
        divSwitch.appendChild(this.getFavSwitch());
        divSwitch.appendChild(favLabel);

        this.setDetailsBtn();
        cardBody.appendChild(this.getDetailsBtn());
        cardBody.appendChild(divSwitch) /*Extra stuff*/

        return card;
    }

    getDetailedCard = (content) => {
        let makeTag = (tag, htmlClass, style, text, url) => {
            let htmlTag = document.createElement(tag);
            if (htmlClass) {
                htmlTag.setAttribute("class", htmlClass)
            }
            if (style) {
                htmlTag.setAttribute("style", style)
            }
            if (text) {
                htmlTag.appendChild(document.createTextNode(text))
            }
            if (url) {
                htmlTag.setAttribute("src", url)
            }

            return htmlTag;
        }

        let mainDiv = makeTag("div", "card mb-3", "max-width: 900px;")
        let rowDiv = makeTag("div", "row g-0")
        let posterDiv = makeTag("div", "col-md-4")
        let detailsDiv = makeTag("div", "col-md-8")
        let cardBodyDiv = makeTag("div", "card-body")
        let h5 = makeTag("h5", "card-title", null, content.title)
        let img = makeTag("img", "img-responsive rounded-start poster-settings", null, null, content.url)
        let pYear = makeTag("p", "card-text pCard", null, "Year: " + content.year)
        let pGenre = makeTag("p", "card-text pCard", null, "Genre: " + content.category)
        let pSinopsis = makeTag("p", "card-text pCard", null, "Sinopsis: " + content.sinopsis)
        let pDirection = makeTag("p", "card-text pCard", null, "Direction: " + content.direction)
        let pActors = makeTag("p", "card-text pCard", null, "Actors: " + content.actors)
        let pDuration = makeTag("p", "card-text pCard", null, "Duration: " + content.duration)
        let pRating = makeTag("p", "card-text pCard", null, "Rating: " + content.rating)

        cardBodyDiv.appendChild(h5);
        cardBodyDiv.appendChild(pYear);
        cardBodyDiv.appendChild(pGenre);
        cardBodyDiv.appendChild(pSinopsis);
        cardBodyDiv.appendChild(pDirection);
        cardBodyDiv.appendChild(pActors);
        cardBodyDiv.appendChild(pDuration);
        cardBodyDiv.appendChild(pRating);
        cardBodyDiv.appendChild(this.getCloseBtn())
        detailsDiv.appendChild(cardBodyDiv)
        posterDiv.appendChild(img)
        rowDiv.appendChild(posterDiv)
        rowDiv.appendChild(detailsDiv)
        mainDiv.appendChild(rowDiv)

        return mainDiv;
    }

    setDetailsBtn = () => {
        this.btnDetails = document.createElement('button');
        this.btnDetails.appendChild(document.createTextNode("Details"));
        this.btnDetails.setAttribute("id", this.id);
        this.btnDetails.setAttribute("class", "btn btn-dark btnFilmDetails")
    }

    setFavSwitch = () => {
        this.favSwitch = document.createElement("input")
        this.favSwitch.setAttribute("type", "checkbox") /*Extra stuff*/
        this.favSwitch.setAttribute("class", "form-check-input") /*Extra stuff*/
        this.favSwitch.setAttribute("id", "fav-" + this.id) /*Extra stuff*/
    }

    getCloseBtn = () => {
        let button = document.createElement('button');
        button.appendChild(document.createTextNode("Close"));
        button.setAttribute("id", "closeCard");
        button.setAttribute("class", "btn btn-dark btnFilmDetails")
        button.setAttribute("onclick", 'listRender()')
        return button;
    }

    getFavSwitch = () => { 
        return this.favSwitch
    }

    getDetailsBtn = () => {
        return this.btnDetails
    }
}