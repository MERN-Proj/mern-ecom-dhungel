import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Nav } from "./components";

export const App = () => {
  return (
    <BrowserRouter>
      <Nav />

      <div className="container" style={{ marginTop: "2%" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
