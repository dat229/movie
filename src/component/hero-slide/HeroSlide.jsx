import React, { useEffect, useRef, useState } from 'react';

import {useNavigate} from 'react-router'

import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button,{OutlineButton} from '../button/Button';

import './heroSlide.scss';
import Modal, { ModalContent } from '../modal/Modal';

const HeroSlide = () => {

    const [heroList,setHeroList] = useState([]);

    useEffect(()=>{
        const getMovies = async () => {
            const params = {page: 1};
            try {
                const reponse =await tmdbApi.getMoviesList(movieType.popular,{params});
                setHeroList(reponse.results.slice(1,6));
            }catch{
                console.log('error');
            }
        }

        getMovies();
    },[])


    return (
      <div className='header__slide'>
          <div className='hero-slide'>
            <Swiper
                grabCursor= {true}
                spaceBetween = {0}
                slidesPerView = {1}
            >
                {
                heroList.map((itemHero,i) => (
                    <SwiperSlide key={i}>
                    {({ isActive }) => (
                        <SliceItem className= {isActive ? 'active' : ''} item={itemHero} />
                    )}
                </SwiperSlide>
                ))}
            </Swiper>
            {
                heroList.map((item,i)=>(
                    <ModalHero key={i} item={item} />
                ))
            }
          </div>
      </div>
  );
};

export default HeroSlide;

const SliceItem= (props) =>{

    let navigate = useNavigate();

    const item = props.item;

    const bgImg = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    
    const heroTrailer =async () =>{
        const modalItem = document.querySelector(`#modal__${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie,item.id);

        if(videos.results.length>0){
        
            const trailerItem = `https://www.youtube.com/embed/${videos.results[0].key}`;

            modalItem.querySelector('.modal__content > iframe').setAttribute('src',trailerItem);
        }else{
            modalItem.querySelector('.modal__content > iframe').innerHTML('No trailer');
        }

        modalItem.classList.toggle('active');

    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${bgImg})`}}
        >
            <div className="hero-slide__item__content">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={()=>navigate(`/movie/${item.id}`)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={heroTrailer}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const ModalHero = (props) =>{
    
    const closeRef = useRef(null);
    const item = props.item;

    const onClose = ()=>{closeRef.current.setAttribute('src','')}

    return(
        <Modal active={false} id={`modal__${item.id}`} >
            <ModalContent onClose = {onClose}>
                <iframe ref={closeRef} style={{width:'100%', height:'500px'}} title='iframe'></iframe>
            </ModalContent>
        </Modal>
    )
}
