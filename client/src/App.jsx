import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import { CompleteRegistration, Home, Login, Register } from "./pages";
import { Nav } from "./components";

export const App = () => {
  return (
    <BrowserRouter>
      <Nav />

      <MDBContainer className="mt-5">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/register/complete"
            component={CompleteRegistration}
          />
        </Switch>
      </MDBContainer>
    </BrowserRouter>
  );
};

export default App;
