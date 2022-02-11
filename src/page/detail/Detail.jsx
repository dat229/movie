import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import Button, { OutlineButton } from '../../component/button/Button';
import HeroSlide from '../../component/hero-slide/HeroSlide';
import MovieList from '../../component/movie-list/MovieList';
import CastList from './CastList';
import VideoList from './VideoList';

const Detail = (props) => {

  const [items,setItems] = useState([]);

  const {category,id} = useParams();

  let bgDetail = null;
  let posterDetail = null;
  
  if(items.poster_path || items.backdrop_path){
    bgDetail = apiConfig.originalImage(items.backdrop_path || items.poster_path);
    posterDetail = apiConfig.w500Image(items.poster_path || items.backdrop_path);
  }
  useEffect(()=>{

    let reponse=null;

    const getMovie = async () =>{ 
      reponse=await tmdbApi.detail(category,id,{params:{}});
      setItems(reponse); 
    }

    getMovie();
  },[])

  return (

      <>
        <div className="detail">
          <div className='banner'
            style={{backgroundImage: `url(${bgDetail})`}}
          ></div>
          <div className="detail__header mb-3">
              <div className='detail__header__poster'>
                <div className='detail__header__poster__img'
                  style={{backgroundImage:`url(${posterDetail})`}}  
                ></div>
              </div>
              <div className='detail__header__content'>
                <h1>{items.name || items.title}</h1>
                <div className='detail__header__content__genres'>
                  {
                    items.genres && items.genres.slice(0,5).map((item,i)=>(
                      <OutlineButton className="small" key={i} >{item.name}</OutlineButton>  
                    ))
                  }
                </div>
                <span>{items.overview}</span>
                <div className='detail__header__content__cast'>
                  <h2>Casts</h2>
                  <CastList item={items} category={category} id={id} />
                </div>
              </div>
          </div>
          <div className='detail__list'>
            <VideoList item={items} category={category} id={id} />
          </div>
          <div className='detail__movies'>
            <MovieList category={category} type={'popular'}/>
          </div>
        </div>
      </>
  );
};

export default Detail;
