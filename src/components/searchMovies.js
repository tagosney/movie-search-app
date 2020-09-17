import React, { useState } from 'react';
import MovieCard from './movieCard';

export default function SearchMovies() {

    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    //send default state to return an array of the state and a funtion that will update the state of the first parameter
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=15285ac39ed5d7c3609459ef36e7d269&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
        }
        catch (err) {
            console.log(err);
            setMovies([]);
        }

    }

    return (
        <div>
            <form onSubmit={searchMovies} className="form">
                <label className="label" htmlFor="query">
                    Movie Name
                    </label>
                <input
                    className="input"
                    type="text"
                    name="query"
                    value={query}

                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="i.e Jurassic Park"
                />
                <button className="button" type="submit">
                    Search
                    </button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>

        </div>
    )

}