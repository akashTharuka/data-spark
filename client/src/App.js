import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, DatasetDetails } from './components';

function App() {
	return (
		<Router>
			<div className="App">
				<div id='content'>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/details">
							<DatasetDetails />
						</Route>
					</Switch>
				</div>
				
			</div>
		</Router>
	);
}

export default App;
