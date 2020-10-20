import React from 'react';

import SideBar from '../../components/SideBar';
import OrphanageBoxEdit from '../../components/OrphanageBoxEdit';

import './styles.css';

function RegisteredOrphanages() {
  return (
    <div id="page-dashboard">
      <SideBar 
        dashboard
        buttonActive="location"
      />
      <div className="container">
        <header>
          <h1>Orfanatos Cadastrados</h1>
          <span>2 orfanatos</span>
        </header>

        <main className="orphanage-box">
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
          <OrphanageBoxEdit />
        </main>
      </div>
    </div>
  );
}

export default RegisteredOrphanages;