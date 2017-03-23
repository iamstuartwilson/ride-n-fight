import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import Hero from '../../../templates/components/hero.jsx';
import Card from '../../../templates/components/card.jsx';

import stravaApi from '../../lib/strava-api';
import polylineToPath from '../../lib/polyline-to-path';

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      athlete: {},
      groupActivities: [],
    };
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setUser(props.match.params.id);
  }

  componentDidMount() {
    this.setUser(this.props.match.params.id);
  }

  setUser(userId) {
    stravaApi.get(`/user/${userId}`).then((json) => {
      this.state.athlete = json.user.athlete;
      this.setState(this.state);
    });

    stravaApi.get(`/user/${userId}/rides`).then((json) => {
      this.state.groupActivities = json.groupActivities.map((ride) => {
        ride.svg = polylineToPath(ride.master.map.summary_polyline);

        return ride;
      });

      this.setState(this.state);
    });
  }

  render() {
    return (
      <div>
        <Hero>
          <div className="container">
            <img src={this.state.athlete.profile} alt={this.state.athlete.firstname} className="rnf-badge" />
            <h1>{this.state.athlete.firstname} {this.state.athlete.lastname}</h1>
            <p>{this.state.athlete.city}, {this.state.athlete.country}</p>
          </div>
        </Hero>

        <div className="container">
          <h2>Rides: ({this.state.groupActivities.length})</h2>
          <div className="grid">
            {this.state.groupActivities.map((ride) =>
              <Card>
                <h3>{ride.master.name}</h3>
                <svg id="svg" height="400" width="400" preserveAspectRatio="xMinYMin meet" viewBox={ride.svg.viewBox}><g><path d={ride.svg.path}></path></g></svg>
                {ride.friends.map((friend) =>
                  <Link to={`/user/${friend.athlete.id}`}>
                    <img src={friend.athlete.profile_medium} alt={friend.athlete.firstname} className="rnf-badge rnf-badge--sm" />
                  </Link>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
