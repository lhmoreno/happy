import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../images/logo.svg';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="app-info">
          <img src={logoImg} alt="happy"/>
          <div className="location">
            <strong>Itararé</strong>
            <span>São Paulo</span>
          </div>
        </div>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/login" className="login">
          <span>Acesso restrito</span>
        </Link>

        <Link to="/map" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;