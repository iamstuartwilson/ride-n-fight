let React = require('react');
let Layout = require('../layouts/default');
let Card = require('../card');

class RouteIndex extends React.Component {
  render() {
    const fullName = `${this.props.user.athlete.firstname} ${this.props.user.athlete.lastname}`;

    return (
      <Layout head={{
        title: fullName
      }}>
        <div data-react-root></div>
      </Layout>
    );
  }
}

module.exports = RouteIndex;
