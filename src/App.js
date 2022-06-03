import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, DatasetDetails } from './components';
import { DashboardLogin, Dashboard, ProtectedRoute } from './dashboard_components';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

toast.configure();
function App() {

	const [status, setStatus] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token !== null && token !== undefined){
            setStatus(true);
        }
    }, []);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Home status={status} />
					</Route>
					<Route path="/details/:id">
						<DatasetDetails status={status} />
					</Route>
					<Route exact path='/adminlogin' component={DashboardLogin} />
					<ProtectedRoute exact path='/dashboard' component={Dashboard} />
					<ProtectedRoute exact path='/dashboard/details/:id' component={DatasetDetails} type="dashboard" />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
