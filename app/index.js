// Deps
import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

// Pages
import Profile from './components/profile';

// Super contrived
ReactDOM.render(
  <Router>
    <Route name="profile" path="/profile/:id" component={Profile} />
  </Router>,
  document.querySelector('[data-react-root]')
);
