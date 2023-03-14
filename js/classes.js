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
    constructor(id, title, year, category, duration, sinopsis, poster, direction, actors, rating, review) {
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
    }

    getCard = async () => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let imgCartaz = document.createElement("img");
        imgCartaz.setAttribute("class", "card-img-top");
        imgCartaz.setAttribute("src", this.poster);
        let cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body");
        let hCardTitle = document.createElement("h5")
        hCardTitle.setAttribute("class", "card-title");
        let divDetalhes = document.createElement("div");
        divDetalhes.setAttribute("class", "display:flex; justify-content:space-around");
        let divGenero = document.createElement("div");
        divGenero.setAttribute("style", "flex-grow:1");
        let divAnoProducao = document.createElement("div");
        divAnoProducao.setAttribute("style", "flex-grow:1");
        let divClassificacao = document.createElement("div");
        divClassificacao.setAttribute("style", "flex-grow:1");
        hCardTitle.appendChild(document.createTextNode(this.title))
        divGenero.appendChild(document.createTextNode(this.genre))
        divAnoProducao.appendChild(document.createTextNode(this.year))
        divClassificacao.appendChild(document.createTextNode(this.rating))
        divDetalhes.appendChild(divGenero);
        divDetalhes.appendChild(divAnoProducao);
        divDetalhes.appendChild(divClassificacao);
        card.appendChild(imgCartaz);
        card.appendChild(cardBody);
        cardBody.appendChild(hCardTitle)
        cardBody.appendChild(divDetalhes);
        return card;
    }
}