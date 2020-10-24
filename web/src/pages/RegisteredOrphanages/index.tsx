import React, { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import SideBar from '../../components/SideBar';
import OrphanageBoxEdit from '../../components/OrphanageBoxEdit';
import { OrphanageDataProps } from '../../utils/apiFake';
import api from '../../services/api';
import Img from '../../images/not-result.svg';

import './styles.css';

function RegisteredOrphanages() {
  const [orphanages, setOrphanages] = useState<OrphanageDataProps[]>();
  const [notResult, setNotResult] = useState(false);

  useEffect(() => {
    api.get('orphanages')
      .then((res: AxiosResponse<OrphanageDataProps[]>) => {
        if (res.data[0]) {
          setOrphanages(res.data);
        } else {
          setNotResult(true);
        }
      })
      .catch((err: AxiosError) => {
        
      })
  }, []);

  return (
    <div id="page-dashboard">
      <SideBar 
        dashboard
        buttonActive="location"
      />
      <div className="container">
        <header>
          <h1>Orfanatos cadastrados</h1>
          <span>{orphanages ? orphanages.length : 0} orfanatos</span>
        </header>

        <main className="orphanage-box">
          {orphanages?.map(orphanage => (
            <OrphanageBoxEdit 
              key={orphanage.id}
              orphanage={orphanage}
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

export default RegisteredOrphanages;