// Deps
import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

// Pages
import User from './templates/routes/user';

const Fight = ({match}) => <div>Fighting: {match.params.id} / {match.params.fid}</div>

ReactDOM.render(
  <Router>
    <div>
      <Route path="/user/:id" exact component={User} />
      <Route path="/user/:id/fight/:fid" component={Fight} />
    </div>
  </Router>,
  document.querySelector('[data-react-root]')
);
