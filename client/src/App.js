import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, DatasetDetails } from './components';
import { DashboardLogin, Dashboard } from './dashboard_components';
import { useState, useEffect } from 'react';

function App() {

	const [status, setStatus] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log(token);
        if (token !== null || token !== undefined){
            setStatus(true);
        }
    }, []);

	return (
		<Router>
			<div className="App">
				<div id='content'>
					<Switch>
						<Route exact path="/">
							<Home status={status} />
						</Route>
						<Route path="/details">
							<DatasetDetails status={status} />
						</Route>
						<Route path='/dashboardLogin'>
							<DashboardLogin />
						</Route>
						<Route path='/dashboard'>
							<Dashboard />
						</Route>
					</Switch>
				</div>
				
			</div>
		</Router>
	);
}

export default App;
