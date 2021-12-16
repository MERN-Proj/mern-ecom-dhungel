import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Nav } from "./components";
import { MDBContainer } from "mdbreact";

export const App = () => {
  return (
    <BrowserRouter>
      <Nav />

      <MDBContainer className="mt-5">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </MDBContainer>
    </BrowserRouter>
  );
};

export default App;
