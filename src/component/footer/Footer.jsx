import React from 'react';
import { Link } from 'react-router-dom';

import tmovie from '../../assets/tmovie.png';
import bg from '../../assets/footer-bg.jpg';


import './footer.scss';

const Footer = () => {
  return (
      <div className='footer' style={{backgroundImage:`url(${bg})`}}>
          <div className='footer__logo mb-2'>
            <img src={tmovie} alt='logo footer' />
          </div>
          <div className='footer__content mb-3'>
            <ul className='footer__content__path'>
              <Link to='/' className='footer__content__path__btn'>Home</Link>
              <Link to='/' className='footer__content__path__btn'>Contact us</Link>
              <Link to='/' className='footer__content__path__btn'>Term of services</Link>
              <Link to='/' className='footer__content__path__btn'>About us</Link>
            </ul>
            <ul className='footer__content__path'>
              <Link to='/' className='footer__content__path__btn'>Linkve</Link>
              <Link to='/' className='footer__content__path__btn'>FAQ</Link>
              <Link to='/' className='footer__content__path__btn'>Premium</Link>
              <Link to='/' className='footer__content__path__btn'>Privacy poLinkcy</Link>
            </ul>
            <ul className='footer__content__path'>
              <Link to='/' className='footer__content__path__btn'>You much watch</Link>
              <Link to='/' className='footer__content__path__btn'>Recent release</Link>
              <Link to='/' className='footer__content__path__btn'>Top IMDB</Link>
            </ul>
          </div>
      </div>
  );
};

export default Footer;
