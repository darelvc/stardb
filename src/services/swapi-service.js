export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

     getResource = async (url) => {
        const res = await fetch(
            `${this._apiBase}${url}`
        );

        if (!res.ok) {
            throw new Error(
                `Could not fetch ${url}, we received ${res.status}`
            )
        }

        return await res.json();
    };

    // async getAllPeople() {
    //     const res = await this.getResource(`/people/`);
    //
    //     return res.results.map(this._transformPerson);
    // }

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);

        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`);

        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);

        return res.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`);

        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);

        return res.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}`);

        return this._transformStarship(starship);
    };

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        const id = this._extractId(planet);

        return {
            id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformStarship = (starship) => {
        return {
        id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }

}

// const swapi = new SwapiService();

// swapi.getAllPeople().then((people) => {
//     people.forEach(i => {
//         console.log(i.name);
//     })
// });


// const getResource = async (url) => {
//     const res = await fetch(url);
//
//     if (!res.ok) {
//         throw new Error(
//             `Could not fetch ${url}, we received ${res.status}`
//         )
//     }
//
//     const body = await res.json();
//
//     return body
// };
//
// getResource('https://swapi.co/api/people/2')
//     .then(body => {
//         console.log(body, 'Oleg')
//     })
//     .catch(err => {
//        console.error('We got an error: ', err)
//     });
//
//
// fetch('https://swapi.co/api/people/1')
//     .then(res => {
//         return res.json()
//     })
//     .then(body => {
//         console.log(body)
//     });