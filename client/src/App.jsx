import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import {
  CompleteRegistration,
  ForgotPassword,
  Home,
  Login,
  Register,
} from './pages';
import { Nav } from './components';
import { useDispatch } from 'react-redux';
import { auth } from './util';
import { addAuthenticatedUser } from './state';
import { ProtectedGuestRoute } from './pages';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();

        const payload = {
          email: user.email,
          token,
        };

        dispatch(addAuthenticatedUser(payload));
      } else {
        // user is sign out
      }
    });

    // clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />

      <MDBContainer className="mt-5">
        <Switch>
          <Route exact path="/" component={Home} />

          <ProtectedGuestRoute>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/register/complete"
              component={CompleteRegistration}
            />
            <Route exact path="/forgot/password" component={ForgotPassword} />
          </ProtectedGuestRoute>
        </Switch>
      </MDBContainer>
    </BrowserRouter>
  );
};

export default App;
