import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/Login';
import RegisteredOrphanages from './pages/RegisteredOrphanages';
import PendingOrphanages from './pages/PendingOrphanages';
import DeleteOrphanage from './pages/DeleteOrphanage';
import EditOrphanage from './pages/EditOrphanage';
import OrphanagePending from './pages/OrphanagePending';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/map" component={OrphanagesMap} />
          <Route path="/login" component={Login} />
          <Route path="/orphanages/create" component={CreateOrphanage} />
          <Route path="/orphanages/:id" component={Orphanage} />

          <Route path="/dashboard/delete/:id" component={DeleteOrphanage} />
          <Route path="/dashboard/edit/:id" component={EditOrphanage} />
          <Route path="/dashboard/pending/:id" component={OrphanagePending} />
          <Route path="/dashboard/orphanages" component={RegisteredOrphanages} />
          <Route path="/dashboard/pending" component={PendingOrphanages} />
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;