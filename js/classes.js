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
}