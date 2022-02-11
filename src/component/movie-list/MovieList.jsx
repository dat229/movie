import React, { useEffect, useState } from 'react';

import './movieList.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import MovieCard from '../movie-card/MovieCard';

import tmdbApi, { category } from '../../api/tmdbApi';


const MovieList = (props) => {
    
    const [movies,setMovies] = useState([]);

    useEffect(()=>{

        const getList = async () => { 
            let reponse = null;

            if(props.type!=='similar'){
                switch(props.category){
                    case category.movie:
                        reponse =await tmdbApi.getMoviesList(props.type, {params:{}});
                        console.log(reponse);
                    break;
                    default:
                        reponse =await tmdbApi.getTvList(props.type, {params:{}});
                }
            }else{
                reponse = await tmdbApi.similar(props.type, {params:{}});
            }

            setMovies(reponse.results);
        }

        getList();
    },[])
    
    return(
      <div className="movie-list">
          <Swiper
            grabCursor= {true}
            spaceBetween = {10}
            slidesPerView = {'auto'}
          >
            {
                movies.map((item,i) => (
                    <SwiperSlide key={i}>
                        <MovieCard item={item} category={props.category}/>
                    </SwiperSlide>
                ))}
              
          </Swiper>
      </div>
  );
};

export default MovieList;
