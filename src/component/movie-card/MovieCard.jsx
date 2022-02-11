import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';
import Button from '../button/Button';

import './movieCard.scss';

const MovieCard = (props) => {
  
  const item = props.item;
  const [ids,setIds] = useState(item.id);

  const link = '/' + category[props.category] + '/' + ids;
  
  const setLink = () => setIds(item.id);

  const bgMovieCard = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
      <Link to={link} onClick={setLink}>
        <div className='movie-card' style={{backgroundImage:`url(${bgMovieCard})`}}>
            <Button>
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </Button>
        </div>
        <h3>{item.title || item.name}</h3>
      </Link>
  );
};

export default MovieCard;
