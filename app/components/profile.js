import React from 'react';
import 'whatwg-fetch';
import Link from 'react-router-dom';

import Hero from './hero';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      athlete: {},
      groupActivities: [],
    };
  }

  componentDidMount() {
    this.userId = this.props.match.params.id;

    fetch(`/profile/${this.userId}/rides`).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({
        athlete: json.user.athlete,
        groupActivities: json.groupActivities,
      });
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
            <Link to="profile" params={{id: 123}}>Boom</Link>
          </div>
        </Hero>

        <div className="container">
          <h2>Rides: ({this.state.groupActivities.length})</h2>
          {this.state.groupActivities.map((ride) =>
            <div>
              <h3>{ride.master.name}</h3>
              {ride.friends.map((friend) =>
                <Link to="profile" params={{id: friend.athlete.id}}>
                  <img src={friend.athlete.profile_medium} alt={friend.athlete.firstname} className="rnf-badge rnf-badge--sm" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
