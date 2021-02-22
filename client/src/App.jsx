import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, createContext } from "react";
import { UserCtx } from './context';

// Components
import AppRoute from './components/AppRoute'

// Set User Properties

function App() {
  const [cookies, setCookies, removeCookies] = useCookies("");
  const [user, setUser] = useState(false);

// Function to remove or add cookies
  const handleCookies = (action, key, val = 0) => {
    if(action == "add") {
      setCookies(key, val, {
        path: "/",
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
        secure: true,
        sameSite: true,
      });
    } else if (action == "remove") {
      removeCookies(key, val, {
        path: "/",
        secure: true,
        sameSite: true,
      });
    } else {
      console.log('You put argument wrong')
    }
  };

  const handleUser = (value) => {
    setUser(value);
  };

  return (
    <UserCtx.Provider value={{user, handleUser, cookies, handleCookies}}>
    <div className="App">
      <AppRoute/>
    </div>
    </UserCtx.Provider>
  );
}

export default App;
