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
    constructor(id, title, year, category, duration, sinopsis, poster, direction, actors, rating, review, btnDetails) {
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

        card.setAttribute("class", "card");
        imgPoster.setAttribute("class", "card-img-top");
        imgPoster.setAttribute("src", this.poster);
        cardBody.setAttribute("class", "card-body");
        hCardTitle.setAttribute("class", "card-title");
        divDetails.setAttribute("class", "display:flex; justify-content:space-around");
        divGenre.setAttribute("style", "flex-grow:1");
        divYear.setAttribute("style", "flex-grow:1");
        divRating.setAttribute("style", "flex-grow:1");

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

        this.setDetailsBtn();
        cardBody.appendChild(this.getDetailsBtn());

        return card;
    }

    setDetailsBtn = () => {
        this.btnDetails = document.createElement('button');
        this.btnDetails.appendChild(document.createTextNode("Detalhes"));
        this.btnDetails.setAttribute("id", this.id);
        this.btnDetails.setAttribute("class", "btn btn-dark btnFilmDetails")
    }

    getDetailsBtn = () => {
        return this.btnDetails
    }
}