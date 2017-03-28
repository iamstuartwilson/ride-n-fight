import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import moment from 'moment';

import Hero from '../../../templates/components/hero.jsx';
import Card from '../../../templates/components/card.jsx';

import stravaApi from '../../lib/strava-api';

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
      this.state.groupActivities = json.groupActivities;
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
          <div className="grid">
            <div className="grid__col-12">
              <h2>Rides: ({this.state.groupActivities.length})</h2>
            </div>

            {this.state.groupActivities.map((ride) =>
              <div className="grid__col-md-4">
                <Card>
                  <h3>{ride.master.name}</h3>
                  <p><time>{moment(ride.master.start_date_local).format('MMMM Do YYYY, h:mm:ss a')}</time></p>
                  <hr />
                  {ride.friends.map((friend) =>
                    <Link to={`/user/${friend.athlete.id}`}>
                      <img src={friend.athlete.profile_medium} alt={friend.athlete.firstname} className="rnf-badge rnf-badge--sm" />
                    </Link>
                  )}
                  <hr />
                  <Link to={`/user/${this.state.athlete.id}/fight/${ride.master.id}`} className="rnf-button rnf-button--full-width text-center">Fight!</Link>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
