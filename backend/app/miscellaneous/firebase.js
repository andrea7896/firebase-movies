const firebase = require('firebase/app')
require('firebase/database');
require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function getMoviesFromDB(){
    return new Promise((resolve,reject) => {
        database.ref('/movies').once('value')
        .then((snapshot) => {
            let movies = [];
            let results = snapshot.val();
            
            for(let key in results){
                movies[key]= results[key];
            }
            resolve(movies);
        }).catch(error => {
            resolve([]);
            console.error(error);
        });
    });
}

module.exports = {
    getMovies: () => {
        return getMoviesFromDB();
    },
    updateMovie: async (movie) => {
        let movies = await getMoviesFromDB();

        let position = movies.findIndex(m => {
            if(m !== undefined){
                return m.id === movie.id;
            }
        });
        return new Promise((resolve,reject) => {
            firebase.database().ref('/movies/'+position).set(movie)
        .then(() => {
            resolve(movie);
        }).catch(err =>{
            reject(err);
            console.error(err);
            });
        });
    },

    deleteMovie: async(movie) => {
        let movies = await getMoviesFromDB();
        let position = movies.findIndex(m => {
            if(m !== undefined){
                return m.id === movie.id;
            }
        });

        return new Promise((resolve,reject) => {
            firebase.database().ref('/movies/'+position).remove()
            .then(()=>{
                resolve(movie);
            }).catch(err =>{
                reject(err);
                console.error(err);
            })
        });
    },
    createMovie: async(movie) =>{
        let movies = await getMoviesFromDB();

        return new Promise((resolve,reject) => {
            firebase.database().ref('/movies').push(movie)
            .then(()=>{
                resolve(movies);
            }).catch(err =>{
                reject(err);
                console.error(err);
            })
        });
    }
}