import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useSelector } from "react-redux";

function App() {
  const isLogged = useSelector((state) => state?.user?.isLogged);
  const user = useSelector((state) => state?.user?.user);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLogged ? <Home user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {isLogged ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {isLogged ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/profile/:id">
          {isLogged ? <Profile currentUser={user} /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
