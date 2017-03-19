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
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h1>{fullName}</h1>
              <Card img={{src: this.props.user.athlete.profile, alt: fullName}} title={fullName}>
                <p>{this.props.user.athlete.city}</p>
              </Card>

              <h2>Clubs</h2>
              {this.props.user.athlete.clubs.map((club) =>
                <Card img={{src: club.profile_medium, alt: club.name}} title={club.name} />
              )}

              <h2>Rides</h2>
              {this.props.rides.map((ride) =>
                <div>
                  <h3><a href={ride.url}>{ride.name}</a></h3>
                  <p>Date: {ride.start_date_local}</p>
                  <p>Distance: {Math.round(ride.distance / 1000, 10)}km</p>
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
