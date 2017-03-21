const React = require('react');
const Layout = require('../layouts/default');
const Hero = require('../components/hero');
const Button = require('../components/button');

class RouteIndex extends React.Component {
  render() {
    return (
      <Layout head={{}}>
        <Hero>
          <div className="container">
            <h1>KO your friends!</h1>
            <br />
            <Button href={this.props.strava.authUrl} className="rnf-button--strava">Connect with Strava</Button>
          </div>
        </Hero>
      </Layout>
    );
  }
}

module.exports = RouteIndex;
