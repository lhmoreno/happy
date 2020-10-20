import React from 'react';
import { useHistory } from 'react-router-dom';

import DeleteImg from '../../images/delete.svg';

import './styles.css';

function DeleteRegister() {
  const { goBack } = useHistory();

  return (
    <div id="page-delete-register">
      <div className="content-wrapper">
        <main>
          <h1>Excluir!</h1>
          <p>
            Você tem certeza que quer
            excluir Primeiro?
          </p>

          <div className="buttons-container">
            <button 
              type="button" 
              className="cancel"
              onClick={goBack}
            >
              Não
            </button>
            <button 
              type="button"
              className="confirm"
              onClick={goBack}
            >
              Sim
            </button>
          </div>
        </main>

        <img src={DeleteImg} alt="Excluir" />
      </div>
    </div>
  );
}

export default DeleteRegister;