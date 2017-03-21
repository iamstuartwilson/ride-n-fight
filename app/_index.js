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

const Boomer = () => <div>Boom</div>

ReactDOM.render(
  <Router>
    <Route path="/profile" exact component={Boomer}>
      <Route path="/318175" component={Profile} />
    </Route>
  </Router>,
  document.querySelector('[data-react-root]')
);
