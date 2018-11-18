class SwapiService {

    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(
            `${this._apiBase}${url}`
        );

        if (!res.ok) {
            throw new Error(
                `Could not fetch ${url}, we received ${res.status}`
            )
        }

        const body = await res.json();
    
        return body
    };

    async getAllPeople() {
        const res = await this.getResource(`/people/`);

        return res.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}`)
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);

        return res.results;
    }

    getPlanet(id) {
        return this.getResource(`/planets/${id}`)
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);

        return res.results;
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}`)
    }
}

const swapi = new SwapiService();

swapi.getAllPeople().then((people) => {
    people.forEach(i => {
        console.log(i.name);
    })
});

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