import React, { useState } from 'react';

import OrphanageForm, { FormDataOrphanage } from '../../components/OrphanageForm';
import SucessRegister from '../../pages/SucessRegister';

import api from '../../services/api';

function CreateOrphanage() {
  const [sucess, setSucess] = useState(false);

  async function handleSubmit({ 
    about,
    images,
    instructions,
    latitude,
    longitude,
    name,
    open_on_weekends,
    opening_hours,
    whatsapp,
   }: FormDataOrphanage) {

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('whatsapp', whatsapp);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('create/orphanage', data).then(() => {
      setSucess(true);
    }).catch(() => alert('Orfanato não cadastrado. Ocorreu algum erro!')); 
  }

  if (sucess) {
    return <SucessRegister />
  }

  return (
    <OrphanageForm 
      onSubmitForm={handleSubmit}
    />
  );
}

export default CreateOrphanage;