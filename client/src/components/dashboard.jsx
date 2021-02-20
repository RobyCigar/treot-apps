import { useContext } from "react";
import { UserCtx } from "../App";

const Dashboard = (props) => {
	const user = useContext(UserCtx);
	console.log('ini user', user)
	return (
		<div>
			<h1>Welcome to the fuckin dashboard</h1>
		</div>
	);
};

export default Dashboard;
