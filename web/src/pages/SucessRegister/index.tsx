import React from 'react';
import { Link } from 'react-router-dom';

import SucessImg from '../../images/sucess.svg';

import './styles.css';

function SucessRegister() {
  return (
    <div id="page-sucess-register">
      <div className="content-wrapper">
        <main>
          <h1>Ebaaa!</h1>
          <p>
            O cadastro deu certo e foi enviado
            ao administrador para ser aprovado.
            Agora é só esperar :)
          </p>
          <Link to="/app" className="back">
            Voltar para o mapa
          </Link>
        </main>

        <img src={SucessImg} alt="Sucesso" />
      </div>
    </div>
  );
}

export default SucessRegister;