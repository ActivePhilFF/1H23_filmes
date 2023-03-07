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
    constructor(id, title, year, category, poster, director, actors, rating, review) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.category = category;
        this.poster = poster;
        this.director = director;
        this.actors = actors;
        this.rating = rating;
        this.review = review;
    }
}