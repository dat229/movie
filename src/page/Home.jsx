import React from 'react';
import './detail/detail.scss';

import {Link} from 'react-router-dom';
import { category, tvType } from '../api/tmdbApi';

import { OutlineButton } from '../component/button/Button';

import HeroSlide from '../component/hero-slide/HeroSlide';
import MovieList from '../component/movie-list/MovieList';

const Home = () => {
  return (
      <div className="home">
          <HeroSlide />
          <div className='section mb-3'>
            <div className='section__card mb-2'>
              <span>Trending Movies</span>
              <Link to='/movie'>
                <OutlineButton className="small">View More</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.movie} type={tvType.popular} />
          </div>
          <div className='section mb-3'>
            <div className='section__card mb-2'>
              <span>Trending Movies</span>
              <Link to='/movie'>
                <OutlineButton className="small">View More</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.movie} type={tvType.top_rated} />
          </div>
          <div className='section mb-3'>
            <div className='section__card mb-2'>
              <span>Trending Movies</span>
              <Link to='/movie'>
                <OutlineButton className="small">View More</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.tv} type={tvType.popular} />
          </div>
          <div className='section mb-3'>
            <div className='section__card mb-2'>
              <span>Trending Movies</span>
              <Link to='/movie'>
                <OutlineButton className="small">View More</OutlineButton>
              </Link>
            </div>
            <MovieList category={category.tv} type={tvType.top_rated} />
          </div>
      </div>
  );
};

export default Home;
