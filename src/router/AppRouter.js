import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Loader } from '../components/loader/Loader';

export const AppRouter = () => {
   const { checking } = useSelector((state) => state.auth);

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
               <Route exact path='/login' component={LoginScreen} />

               <Route exact path='/' component={CalendarScreen} />

               <Redirect to='/' />
            </Switch>
         </div>
      </Router>
   );
};
