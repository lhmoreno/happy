import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import LogoImg from '../images/logo-login.svg';

import '../styles/pages/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id="page-login">
      <div className="logo-container">
        <img src={LogoImg} alt="happy"/>
      </div>

      <div className="login-container">
        <Link to="/" className="back">
          <FiArrowLeft size={26} color="#15C3D6" />
        </Link>

        <form className="login">
          <fieldset>
            <legend>Fazer login</legend>

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            
            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="config-password">
            <div className="remember-container">
              <input 
                id="save-password"
                type="checkbox"
              />
              <label htmlFor="save-password">Lembrar-me</label>
            </div>
            <span>Esqueci minha senha</span>
          </div>

          <button className="confirm-button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;