let React = require('react');
let Layout = require('../layouts/default');

class RouteIndex extends React.Component {
  render() {
    return (
      <Layout head={{}}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <a href={this.props.strava.authUrl}>Connect with Strava</a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = RouteIndex;
