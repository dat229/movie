import React,{useEffect, useRef, useState} from 'react';

import {useLocation} from 'react-router';

import {Link} from 'react-router-dom';
 
import logo from '../../assets/tmovie.png';

import './header.scss'

const itemHeader = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'Movie',
    path: '/movie',
  },
  {
    type: 'TV Series',
    path: '/tv',
  },
]

const Header = () => {

  const headerRef = useRef(null);

  const location = useLocation();
  const path = location.pathname;

  useEffect(()=>{
    const srcollShrink = () => {
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop >100){
        headerRef.current.classList.add('shrink');
      }else{
        headerRef.current.classList.remove('shrink');
      }
    }

    document.addEventListener('scroll',srcollShrink);

    return()=>{
      document.removeEventListener('scroll',srcollShrink);
    }

  },[])

  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={`${logo}`} className='header__logo__item'  alt="logo-header"/>
            <span>Movie</span>
          </Link>
        </div>
        <div className='header__item'>
          {itemHeader.map((item,i)=>(
            <li className={item.path===path ? 'active' : ''}   
              key={i}>
              <Link  to={item.path}>{item.type}</Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
