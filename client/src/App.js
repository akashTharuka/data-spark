import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, DatasetDetails } from './components';
import { DashboardLogin, Dashboard } from './dashboard_components';

function App() {

	

	return (
		<Router>
			<div className="App">
				<div id='content'>
					<Switch>
						<Route exact path="/">
							<Home logged={true}/>
						</Route>
						<Route path="/details">
							<DatasetDetails />
						</Route>
						<Route path='/dashboardLogin'>
							<DashboardLogin />
						</Route>
					</Switch>
				</div>
				
			</div>
		</Router>
	);
}

export default App;
