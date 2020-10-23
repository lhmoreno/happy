import React, { useContext } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import AuthContext from '../../contexts/auth';
import DeleteImg from '../../images/delete.svg';
import api from '../../services/api';

import './styles.css';

interface DeleteRegisterParams {
  id: string;
}

function DeleteRegister() {
  const { goBack } = useHistory();
  const { id } = useParams<DeleteRegisterParams>();
  const { state: name } = useLocation();

  const { auth, remember } = useContext(AuthContext);

  async function deleteOrphanage() {
    let token: string | null = '';

    if (auth && remember) {
      token = localStorage.getItem('token');
    } else {
      token = sessionStorage.getItem('token');
    }

    await api.delete(`delete/orphanage/${id}`, { headers: { 'x-access-token': token } });

    goBack();
  }

  return (
    <div id="page-delete-register">
      <div className="content-wrapper">
        <main>
          <h1>Excluir!</h1>
          <p>
            Você tem certeza que quer
            excluir {name}?
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
              onClick={deleteOrphanage}
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