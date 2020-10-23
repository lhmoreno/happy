import React, { useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import OrphanageForm from '../../components/OrphanageForm';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import { OrphanageDataProps } from '../../utils/apiFake';


interface OrphanagePendingParams {
  id: string;
}

function OrphanagePending() {
  const { goBack } = useHistory();
  const { id } = useParams<OrphanagePendingParams>();
  const { state: orphanage } = useLocation<OrphanageDataProps>();

  const { auth, remember } = useContext(AuthContext);

  function confirmOrphanage() {
    let token: string | null = '';

    if (auth && remember) {
      token = localStorage.getItem('token');
    } else {
      token = sessionStorage.getItem('token');
    }

    api.put(`confirm/orphanage/${id}`, {}, 
    { headers: { 'x-access-token': token } })
      .then(() => {
        goBack();
      })
      .catch(() => {
        alert('Ocorreu algum erro!');
      });
  }

  return (
    <OrphanageForm 
      onSubmitForm={confirmOrphanage}
      orphanage={orphanage}
      orphanagePending
    />
  );
}

export default OrphanagePending;