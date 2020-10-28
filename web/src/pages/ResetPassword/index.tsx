import React, { useState, FormEvent, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, useParams } from 'react-router-dom';
import Decode from 'jwt-decode';

import LogoImg from '../../images/logo-login.svg';

import api from '../../services/api';

import './styles.css';

function ReserPassword() {
  const { push } = useHistory();
  const { jwt: token } = useParams<{jwt:string}>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const decoded = await Decode(token) as {exp:number};
        if (Date.now() > decoded.exp * 1000) {
          alert('Link expirado!');
          push('/login');
        }
      } catch(err) {
        alert('Link inválido!');
        push('/login');
      }
    }

    verify();
  }, [token, push]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword) return alert('As senhas precisão ser iguais!');

    if (loading) return;

    api.post('reset/password', { token, newPassword: password })
      .then(() => {
        setSend(true);
      })
      .catch(() => {
        alert('Ocorreu algum erro inesperado!')
      })

    setLoading(true);  
  }

  return (
    <div id="page-forgot">
      <div className="logo-container">
        <img src={LogoImg} alt="happy"/>
      </div>

      <div className="forgot-container">
        <Link to="/login" className="back">
          <FiArrowLeft size={26} color="#15C3D6" />
        </Link>

        {!send ? (
          <form className="forgot-form" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="legend">Redefinir senha senha</legend>
              <span className="message">Digite uma nova senha forte.</span>

              <div className="input-block">
                <label htmlFor="password" className="label">Nova senha</label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              
              <div className="input-block">
                <label htmlFor="confirm-password" className="label">Repetir senha</label>
                <input
                  id="confirm-password"
                  type="password"
                  className="input"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </fieldset>

            <button 
              className="confirm-button" 
              type="submit" 
            >
              Redefinir
            </button>
          </form>
        ) : (
          <div className="forgot-form">
            <div className="fieldset">
              <h1 className="legend">Nova senha cadastrada!</h1>
              <span className="message">
                Para entrar em sua conta agora, clique no botão abaixo:
              </span>
            </div>

            <button 
              className="confirm-button" 
              type="submit"
              onClick={() => push('/login')}
            >
              Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ReserPassword;