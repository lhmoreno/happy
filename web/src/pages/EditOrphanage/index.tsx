import React, { useContext } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import OrphanageForm, { FormDataOrphanage } from '../../components/OrphanageForm';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';

import { OrphanageDataProps } from '../../utils/apiFake';

interface EditOrphanageParams {
  id: string;
}

function EditOrphanage() {
  const { id } = useParams<EditOrphanageParams>();
  const { state: orphanage } = useLocation<OrphanageDataProps>();
  const { auth, remember } = useContext(AuthContext);
  const { goBack } = useHistory();

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
      const image = orphanage.images.find(({ url }) => url === urlDelete);
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

    let token: string | null = '';

    if (auth && remember) {
      token = localStorage.getItem('token');
    } else {
      token = sessionStorage.getItem('token');
    }

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