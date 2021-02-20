import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import { createContext } from "react";

// Components
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";

// Set User Properties
const user = {
  name: null,
  email: null,
  token: null,
  role: null,
  score: null,
  role: null,
  avatar: null,
  updated: null,
  created: null,
  login: false,
};

export const UserCtx = createContext(user);

function App() {
  const [cookies, setCookies] = useCookies("");

  const addCookies = (key, val) => {
    setCookies(key, val, {
      path: "/",
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      secure: true,
      sameSite: true,
    });
  };

  return (
    <UserCtx.Provider value={user}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login addCookies={addCookies} currentCookies={cookies} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserCtx.Provider>
  );
}

export default App;
