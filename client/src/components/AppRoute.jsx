import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom'

import Home from './home'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard'
import EditSoal from './editSoal';
import EditUser from './editUser';
import Soal from './soal'

const AppRoute = (props) => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/dashboard">
            <UserRoute/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default AppRoute;

const UserRoute = () => {
	const { path, url } = useRouteMatch()
	return (
		<>
			<Switch>
				<Route exact path={path}>
			     <Dashboard/>
				</Route>
        <Route path={`${path}/edit/:userId`}>
          <EditUser/>
        </Route>
        <Route path={`${path}/soal/:soalId`}>
          <Soal />
        </Route>
        <Route path={`${path}/soal/:soalId`}>
          <Soal />
        </Route>
			</Switch>
		</>
	)
}
