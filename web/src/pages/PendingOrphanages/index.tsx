import React, { useContext, useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

import SideBar from '../../components/SideBar';
import OrphanageBoxEdit from '../../components/OrphanageBoxEdit';
import { OrphanageDataProps } from '../../utils/apiFake';
import api from '../../services/api';
import Img from '../../images/not-result.svg';

import AuthContext from '../../contexts/auth';

import './styles.css';

interface OrphanageAdminProps extends OrphanageDataProps {
  pending: boolean;
}

function PendingOrphanages() {
  const [orphanages, setOrphanages] = useState<OrphanageAdminProps[]>();
  const [notResult, setNotResult] = useState(false);

  const { auth, remember } = useContext(AuthContext);

  useEffect(() => {
    let token: string | null = '';

    if (auth && remember) {
      token = localStorage.getItem('token');
    } else {
      token = sessionStorage.getItem('token');
    }

    api.get('orphanages/pending', { headers: { 'x-access-token': token } })
      .then((res: AxiosResponse<OrphanageAdminProps[]>) => {
        if (res.data[0]) {
          setOrphanages(res.data);
        } else {
          setNotResult(true);
        }
      })
      .catch((err: AxiosError) => {
        
      })
  }, [auth, remember]);

  return (
    <div id="page-dashboard">
      <SideBar 
        dashboard
        buttonActive="info"
      />
      <div className="container">
        <header>
            <h1>Cadastros pendentes</h1>
            <span>{orphanages ? orphanages.length : 0} orfanatos</span>
        </header>

        <main className="orphanage-box">
          {orphanages?.map(orphanage => (
            <OrphanageBoxEdit 
              key={orphanage.id}
              orphanage={orphanage}
              pending
            />
          ))}

        </main>
      </div>

      {notResult &&
        <div className="not-found">
          <img src={Img} alt="Nenhum orfanato pendente"/>
        </div>
      }
    </div>
  );
}

export default PendingOrphanages;