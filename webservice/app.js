require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())

const poster_url = 'https://image.tmdb.org/t/p/original'

app.get('/movies', (req, res) => {
    const search = req.query.search;

    if (search) {
        // Send a GET request to the movie search API
        const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
            }
          };
          
          fetch(url, options)
            .then(res => res.json())
            .then(json => {
                const results = json.results.slice(0, 10).map(movie => {
                    return {
                        movie_id: movie.id,
                        title: movie.title,
                        poster_image_url: poster_url + movie.poster_path,
                        popularity_summary: movie.overview
                    };
                });
                res.status(200).json(results)
            })
            .catch(err => console.error('error:' + err))
    } else {
        res.status(400).json({ error: 'Missing search parameter' });
    }
})

function main() {
    app.listen(port)
}

module.exports = { app, main };