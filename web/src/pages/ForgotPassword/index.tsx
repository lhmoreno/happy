import React, { useState, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import LogoImg from '../../images/logo-login.svg';

import api from '../../services/api';

import './styles.css';

function ForgotPassword() {
  const { push } = useHistory();

  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (loading) return;

    api.post('forgot/password', { email })
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
              <legend className="legend">Esqueci a senha</legend>
              <span className="message">Sua redefinição de senha será enviada para seu e-mail cadastrado.</span>

              <div className="input-block">
                <label htmlFor="email" className="label">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </fieldset>

            <button 
              className="confirm-button" 
              type="submit" 
            >
              Enviar
            </button>
          </form>
        ) : (
          <div className="forgot-form">
            <div className="fieldset">
              <h1 className="legend">E-mail enviado!</h1>
              <span className="message">
                Se este e-mail estiver cadastrado no happy, você receberá um link para redefinir sua senha. 
                Para voltar a página de login, clique no botão abaixo:
              </span>
            </div>

            <button 
              className="confirm-button" 
              type="submit"
              onClick={() => push('/')}
            >
              Voltar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;