import React from 'react';
import { useParams } from 'react-router-dom';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../component/movie-gird/MovieGrid';
import PageHeader from '../component/page-header/PageHeader';

const Catalog = () => {
  
  const {category} = useParams();

  return (
      <div className="catalog">
        <PageHeader>
          {category === cate.movie ? 'tMovie' : 'TV Series'}
        </PageHeader>
        <div className='catalog__grid'>
          <MovieGrid category={category} />
        </div>
      </div>
  );
};

export default Catalog;
