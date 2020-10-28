import React, { useContext } from 'react';
import { 
  BrowserRouter, 
  Switch, 
  Route, 
  Redirect, 
  RouteProps 
} from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RegisteredOrphanages from './pages/RegisteredOrphanages';
import PendingOrphanages from './pages/PendingOrphanages';
import DeleteOrphanage from './pages/DeleteOrphanage';
import EditOrphanage from './pages/EditOrphanage';
import OrphanagePending from './pages/OrphanagePending';

import AuthContext from './contexts/auth';

function Routes() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/map" component={OrphanagesMap} />
          <Route path="/orphanages/create" component={CreateOrphanage} />
          <Route path="/orphanages/:id" component={Orphanage} />

          <Route path="/login" render={() => !auth ? <Login /> : <Redirect to="/dashboard/orphanages" />} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/reset/:jwt" component={ResetPassword} />

          {/* ROTAS PRIVADAS */}
          <PrivateRoute path="/dashboard/delete/:id">
            <DeleteOrphanage />
          </PrivateRoute>

          <PrivateRoute path="/dashboard/edit/:id">
            <EditOrphanage />
          </PrivateRoute>

          <PrivateRoute path="/dashboard/pending/:id">
            <OrphanagePending />
          </PrivateRoute>

          <PrivateRoute path="/dashboard/orphanages">
            <RegisteredOrphanages />
          </PrivateRoute>

          <PrivateRoute path="/dashboard/pending">
            <PendingOrphanages />
          </PrivateRoute>

          {/* <Redirect path="/dashboard" to="/login"/>
          <Redirect path="/" to="/map"/> */}
        </Switch>
    </BrowserRouter>
  );
}

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return (
    <Route 
      {...rest}
      render={() => {
        if (auth) {
          return children
        } else {
          return <Redirect
            to="/login"
          />
        }
      }}
    />
  )
}

export default Routes;