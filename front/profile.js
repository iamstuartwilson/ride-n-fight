import React from 'react';
import 'whatwg-fetch';

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
        <h1>{this.state.athlete.firstname}</h1>
        <img src={this.state.athlete.profile} alt={this.state.athlete.firstname} />

        <h2>Rides: ({this.state.groupActivities.length})</h2>
        {this.state.groupActivities.map((ride) =>
          <div>
            <h3>{ride.master.name} With:</h3>
            <ul>
              {ride.friends.map((friend) =>
                <li>{friend.athlete.firstname}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
