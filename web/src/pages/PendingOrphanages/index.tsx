import React from "react";

import SideBar from '../../components/SideBar';
import OrphanageBoxEdit from '../../components/OrphanageBoxEdit';

import './styles.css';

function PendingOrphanages() {
  return (
    <div id="page-dashboard">
      <SideBar 
        dashboard
        buttonActive="info"
      />
      <div className="container">
        <header>
            <h1>Cadastros pendentes</h1>
            <span>7 orfanatos</span>
        </header>

        <main className="orphanage-box">
            <OrphanageBoxEdit pending />
            <OrphanageBoxEdit pending />
            <OrphanageBoxEdit pending />
            <OrphanageBoxEdit pending />
            <OrphanageBoxEdit pending />
            <OrphanageBoxEdit pending />
            <OrphanageBoxEdit pending />
        </main>
        </div>
    </div>
  );
}

export default PendingOrphanages;