let React = require('react');
let Layout = require('../layouts/default');

class RouteIndex extends React.Component {
  render() {
    return (
      <Layout head={{}}>
        <section className="rnf-hero">
          <div className="container">
            <h1>KO your friends!</h1>
            <br />
            <a href={this.props.strava.authUrl} className="rnf-button rnf-button--strava">Connect with Strava</a>
          </div>
        </section>
      </Layout>
    );
  }
}

module.exports = RouteIndex;
