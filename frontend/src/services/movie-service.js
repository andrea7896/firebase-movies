const axios = require('axios');

const API_URL = 'http://127.0.0.1:3300'

export const getMovies = async (filter, orderBy) => {
    // Regresa una promesa
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/getMovies`, {
            params: {
                filter,
                orderBy
            }
        }).then(function (response) {
            let data = [];
            response.data.data.forEach(movie => {
                if (movie) {
                    let img = movie.poster_path;
            
                    if (movie.poster_path.charAt(0) === '/') {
                        img = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                    }
                    movie.poster_path = img;
                    data.push(movie);
                }
            });
            resolve(data);
        }).catch(function (error) {
            resolve([]);
            console.log(error);
        }).finally(function () {
            // always executed
        });
    });
};

export const updateMovie = async (movie) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/updateMovie`, {
            body: { movie }
        },
        {
            method: 'put',
            'Content-Type': 'application/json'
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            resolve([]);
            console.err(error);
        }).finally(function () {
            // always executed
        });
    });
};

export const createMovie = async (movie) => {
    movie.id = Math.floor(Math.random() * 1000);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/create-movie`, {
            body: { movie }
        },
        {
            method: 'post',
            'Content-Type': 'application/json'
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            resolve([]);
            console.err(error);
        }).finally(function () {
            // always executed
        });
    });
};

export const deleteMovie = async (movie) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/delete-movie`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: { movie }})
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            resolve([]);
            console.err(error);
        });
    });
};
