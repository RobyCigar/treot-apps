import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom'

import Home from './home'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard'
import EditSoal from './editSoal';
import EditUser from './editUser';

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
			<Dashboard/>
			<Switch>
				<Route exact path={`${path}/:userId`}>
					<EditUser/>
				</Route>
			</Switch>
		</>
	)
}