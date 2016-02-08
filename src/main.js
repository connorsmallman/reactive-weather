import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import App from './components/app/view';
import Day from './components/day/view';

class Loading extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return <div>Loading...</div>;
	}
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Loading} />
    	<Route path=":day" component={Day} />
    </Route>
  </Router>
), document.getElementById('app'));


