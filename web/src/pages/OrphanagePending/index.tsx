import React from 'react';
import { useParams } from 'react-router-dom';

import OrphanageForm from '../../components/OrphanageForm';

import { initialOrphanageData } from '../../utils/apiFake';

interface OrphanagePendingParams {
  id: string;
}

function OrphanagePending() {
  const { id } = useParams<OrphanagePendingParams>();

  return (
    <OrphanageForm 
      orphanage={initialOrphanageData}
      orphanagePending
    />
  );
}

export default OrphanagePending;