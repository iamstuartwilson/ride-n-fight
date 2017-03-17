let React = require('react');
let Layout = require('../layouts/default');

class RouteIndex extends React.Component {
  render() {
    const fullName = `${this.props.athlete.firstname} ${this.props.athlete.lastname}`;

    return (
      <Layout head={{
        title: fullName
      }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h1>{fullName}</h1>
              <img src={this.props.athlete.profile} alt={this.props.athlete.username} />
              <p>Location: <b>{this.props.athlete.city}</b></p>

              <h2>Clubs</h2>
              {this.props.athlete.clubs.map((club) =>
                <div>
                  <h3>{club.name}</h3>
                  <img src={club.profile_medium} alt={club.name} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = RouteIndex;
