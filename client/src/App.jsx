import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home, Login, Register} from "./pages";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
