import { AxiosError, AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import OrphanageForm from '../../components/OrphanageForm';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import { OrphanageDataProps } from '../../utils/apiFake';


interface OrphanagePendingParams {
  id: string;
}

function OrphanagePending() {
  const { goBack, push } = useHistory();
  const { id } = useParams<OrphanagePendingParams>();

  const { auth, remember } = useContext(AuthContext);

  const [orphanage, setOrphanage] = useState<OrphanageDataProps>();
  const [token, setToken] = useState('');

  useEffect(() => {
    let tokenSave: string = '';

    if (auth && remember) {
      tokenSave = localStorage.getItem('token') as string;
    } else {
      tokenSave = sessionStorage.getItem('token') as string;
    }

    setToken(tokenSave);

    api.get(`pending/orphanage/${id}`, { headers: { 'x-access-token': tokenSave } })
      .then((res: AxiosResponse<OrphanageDataProps>) => {
        setOrphanage(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          push('/dashboard/pending')
        }
      })
  }, [id, auth, remember, push]);

  function confirmOrphanage() {
    api.put(`confirm/orphanage/${id}`, {}, 
    { headers: { 'x-access-token': token } })
      .then(() => {
        goBack();
      })
      .catch(() => {
        alert('Ocorreu algum erro!');
      });
  }

  function cancelOrphanage() {
    let token: string | null = '';

    if (auth && remember) {
      token = localStorage.getItem('token');
    } else {
      token = sessionStorage.getItem('token');
    }

    api.delete(`cancel/orphanage/${id}`, 
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
      onCancelOrphanage={cancelOrphanage}
      orphanage={orphanage}
      orphanagePending
    />
  );
}

export default OrphanagePending;