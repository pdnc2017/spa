window.jQuery=require('jquery');
require('bootstrap-webpack');
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router'
import App from './App';
import Login from './component/Login';
import Panel from './component/Panel';


const e = document.createElement('div');
e.id = 'app';
document.body.appendChild(e);

ReactDOM.render((
<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
	  <Route path="panel" component={Panel}/>
    </Route>
  </Router>
), e);
