import React, { useState, FormEvent, useContext } from 'react';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import LogoImg from '../../images/logo-login.svg';

import api from '../../services/api';
import AuthContext from '../../contexts/auth';

import './styles.css';

function Login() {
  const { push } = useHistory();
  const { setAuth, remember, setRemember } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    api.post('login', { email, password })
      .then((res: AxiosResponse<{ token: string }>) => {
        if (remember) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('remember', 'true');
          setAuth(true);
          push('/dashboard/orphanages');
        } else {
          sessionStorage.setItem('token', res.data.token);
          localStorage.removeItem('remember');
          setAuth(true);
          push('/dashboard/orphanages');
        }
      })
      .catch(() => {
        setPassword('');
        alert('Email ou senha inválidos');
      })
  }

  return (
    <div id="page-login">
      <div className="logo-container">
        <img src={LogoImg} alt="happy"/>
      </div>

      <div className="login-container">
        <Link to="/" className="back">
          <FiArrowLeft size={26} color="#15C3D6" />
        </Link>

        <form className="login" onSubmit={handleSubmit}>
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
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="config-password">
            <div className="remember-container">
              <button 
                type="button"
                className={remember ? 'checked' : ''}
                onClick={() => setRemember(!remember)}
              >
                <FiCheck size={18} color="#FFF"/>
              </button>

              <span onClick={() => setRemember(!remember)} >Lembrar-me</span>
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