import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

import OrphanageForm, { FormDataOrphanage } from '../../components/OrphanageForm';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';

import { OrphanageDataProps } from '../../utils/apiFake';

interface EditOrphanageParams {
  id: string;
}

function EditOrphanage() {
  const { id } = useParams<EditOrphanageParams>();
  const { auth, remember } = useContext(AuthContext);
  const { goBack, push } = useHistory();

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

    api.get(`orphanage/${id}`, { headers: { 'x-access-token': tokenSave } })
      .then((res: AxiosResponse<OrphanageDataProps>) => {
        setOrphanage(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          push('/dashboard/orphanages')
        }
      })
  }, [id, auth, remember, push]);

  async function editOrphanage({ 
    about,
    images,
    instructions,
    latitude,
    longitude,
    name,
    open_on_weekends,
    opening_hours,
    whatsapp,
    deleteImages
   }: FormDataOrphanage) {
    // CRIAÇÃO DE UM STRING DE EXCLUSÃO DE IMAGENS
    const deleteImagesArray: string[] = [];

    deleteImages?.forEach((urlDelete) => {
      const image = orphanage?.images.find(({ url }) => url === urlDelete);
      deleteImagesArray.push(String(image?.id));
    });

    const delete_images = deleteImagesArray.join();

    // FORM-DATA
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('whatsapp', whatsapp);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('delete_images', delete_images);
    images.forEach(image => {
      data.append('images', image);
    });

    await api.put(`edit/orphanage/${id}`, data, 
    { headers: { 'x-access-token': token } })
    .then(() => {
      goBack();
    })
    .catch(() => {
      alert('Aconteceu um erro inesperado!')
    }); 
  }

  return (
    <OrphanageForm 
      onSubmitForm={editOrphanage}
      orphanage={orphanage}
    />
  );
}

export default EditOrphanage;