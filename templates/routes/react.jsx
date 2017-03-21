let React = require('react');
let Layout = require('../layouts/default');

class RouteIndex extends React.Component {
  render() {
    return (
      <Layout head={{}}>
        <div data-react-root></div>
      </Layout>
    );
  }
}

module.exports = RouteIndex;
