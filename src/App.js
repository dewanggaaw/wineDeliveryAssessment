import "./App.css";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import { Router, Switch, Route } from "react-router-dom";
import history from "./Utilities/History";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
