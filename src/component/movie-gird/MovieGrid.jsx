import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import MovieCard from '../movie-card/MovieCard';

import './movieGrid.scss';

const MovieGrid = (props) => {
    
    const [items,setItems] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);

    const {keyword} = useParams();
    console.log(props.category);

    useEffect(()=>{
        let reponse = null;

        const getListGird = async() =>{
            if(keyword === undefined){
                switch(props.category){
                    case category.movie:
                        reponse =await tmdbApi.getMoviesList(movieType.upcoming,{params:{}});
                        break;
                    default:
                        reponse =await tmdbApi.getTvList(tvType.popular,{params:{}});
                }
            }else{
                const params = {
                    query: keyword,
                }

                reponse =await tmdbApi.search(props.category,{params});
            }

            setItems(reponse.results);
            setTotalPage(reponse.total_pages);
            console.log(reponse);
        }

        getListGird();
    },[props.category, keyword])

    const onLoad = () =>{
        let reponse = null;
        let params = {page: page+1};

        const getListGird = async() =>{
            if(keyword === undefined){
                switch(props.category){
                    case category.movie:
                        reponse =await tmdbApi.getMoviesList(movieType.upcoming,{params});
                        break;
                    default:
                        reponse =await tmdbApi.getTvList(tvType.popular,{params});
                }
            }else{
                const params = {
                    query: keyword,
                }

                reponse =await tmdbApi.search(props.category,{params});
            }

            setItems([...items,...reponse.results]);
            setPage(page+1);
        }

        getListGird();
    }

    return (
    <>
        <div className='section mb-3'>
            <MovieSearch category={props.category} keyword={keyword} />
        </div>
        <div className='movie-grid mb-3'>
            {
                items.map((item,i) => <MovieCard item={item} category={props.category} key={i} />)
            }
        </div>
        {
            page < totalPage ? 
                <div className='movie-grid__load mb-3'>
                    <OutlineButton onClick={onLoad}>Load Move</OutlineButton>
                </div>

            : ''
        }
    </>
  )
}

export default MovieGrid

const MovieSearch = props =>{
    const navigate = useNavigate();

    const [keyword,setKeyWord] = useState(props.keyword ? props.keyword : '');

    const onSearch = useCallback(()=>{
        if(keyword.trim().length > 0){
            navigate(`/${props.category}/search/${keyword}`);
        }
    },[keyword, props.category, navigate])

    useEffect(()=>{
        const onKeyUp = (e) =>{
            e.preventDefault();

            if(e.keyCode===13){
                onSearch();
            }
        } 

        document.addEventListener('keyup',onKeyUp);

        return() =>{
            document.removeEventListener('keyup',onKeyUp);
        }
    },[keyword,onSearch])

    return(
        <div className='movie-search'>
            <Input 
                type='text'
                placeholder= 'input search'
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
            />
            <Button className='small' onClick={onSearch} >Search</Button>
       </div>
    )
}