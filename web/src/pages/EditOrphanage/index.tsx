import React from 'react';
import { useParams } from 'react-router-dom';

import OrphanageForm from '../../components/OrphanageForm';

import { initialOrphanageData } from '../../utils/apiFake';

interface EditOrphanageParams {
  id: string;
}

function EditOrphanage() {
  const { id } = useParams<EditOrphanageParams>();

  return (
    <OrphanageForm 
      orphanage={initialOrphanageData}
    />
  );
}

export default EditOrphanage;