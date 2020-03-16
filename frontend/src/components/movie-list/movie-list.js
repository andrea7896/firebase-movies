import React from 'react';
import { Item, Rating } from 'semantic-ui-react'

import './movie-list.css'

function MovieList(props) {
    let movie = props.movie;
    let img = movie.poster_path;

    if (movie.poster_path.charAt(0) === '/') {
        img = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    }

    function onClick() {
        props.onClick(movie);
    }

    return (
        <Item className="movie-item" onClick={onClick}>
            <Item.Image className="image-content" size='tiny' src={img} />

            <Item.Content className="info-movie">
                <Item.Header as='a'>{movie.title}</Item.Header>
                <Item.Meta>
                    <Rating icon='star' defaultRating={movie.vote_average / 2} maxRating={5} />
                </Item.Meta>
                <Item.Description>
                    {movie.overview}
                </Item.Description>
                <Item.Extra>
                    
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default MovieList;