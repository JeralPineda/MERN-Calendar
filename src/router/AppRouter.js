import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loader } from '../components/loader/Loader';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
   const { checking, uid } = useSelector((state) => state.auth);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(startChecking());
   }, [dispatch]);

   if (checking) {
      return <Loader />;
   }

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute
                  exact //
                  path='/login'
                  component={LoginScreen}
                  isAuthenticated={!!uid} //!! si tengo información
               />

               <PrivateRoute
                  exact
                  path='/'
                  component={CalendarScreen}
                  isAuthenticated={!!uid} //!! si tengo información
               />

               <Redirect to='/' />
            </Switch>
         </div>
      </Router>
   );
};
