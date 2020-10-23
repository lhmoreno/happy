import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import OrphanageForm from '../../components/OrphanageForm';

import { OrphanageDataProps } from '../../utils/apiFake';

interface EditOrphanageParams {
  id: string;
}

function EditOrphanage() {
  const { id } = useParams<EditOrphanageParams>();
  const { state: orphanage } = useLocation<OrphanageDataProps>();

  return (
    <OrphanageForm 
      onSubmitForm={() => {}}
      orphanage={orphanage}
    />
  );
}

export default EditOrphanage;