import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import moment from 'moment';

import Hero from '../../../templates/components/hero.jsx';
import Card from '../../../templates/components/card.jsx';

import stravaApi from '../../lib/strava-api';

class Fight extends React.Component {
  constructor() {
    super();

    this.state = {
      athlete: {},
      challengers: [],
      comparison: [],
    };
  }

  componentWillReceiveProps(props) {
    this.setFight(props.match.params.id, props.match.params.fid);
  }

  componentDidMount() {
    this.setFight(this.props.match.params.id, this.props.match.params.fid);
  }

  setFight(userId, fightId) {
    stravaApi.get(`/user/${userId}`).then((json) => {
      this.state.athlete = json.user.athlete;
      this.setState(this.state);
    });

    stravaApi.get(`/user/${userId}/fight/${fightId}`).then((json) => {
      this.state.comparison = json;
      this.setState(this.state);

      this.state.comparison[0].forEach((effort) => {
        if (effort.athlete.id == userId) {
          return;
        }

        stravaApi.get(`/user/${effort.athlete.id}/`).then((json) => {
          this.state.challengers.push(json.user.athlete);
          this.setState(this.state);
        });
      });
    });
  }

  getUserById(id) {
    let match = {};

    if (id == this.state.athlete.id) {
      match = this.state.athlete;
    }

    this.state.challengers.forEach((challenger) => {
      if (id == challenger.id) {
        match = challenger;
      }
    });

    return match;
  }

  render() {
    return (
      <div>
        <Hero>
          <div className="container">
            <img src={this.state.athlete.profile} alt={this.state.athlete.firstname} className="rnf-badge" />
            <h1>{this.state.athlete.firstname} {this.state.athlete.lastname}</h1>
            <p>- V -</p>
            {this.state.challengers.map((challenger) =>
              <div>
                <img src={challenger.profile} alt={challenger.firstname} className="rnf-badge rnf-badge--sm" />
                <h2>{challenger.firstname} {challenger.lastname}</h2>
              </div>
            )}
          </div>
        </Hero>
        <div>
          {this.state.comparison.map((segment) =>
            <div>
              <h3>{segment[0].segment.name}</h3>
              <p>Elevation Gain: {Math.round(segment[0].segment.elevation_high - segment[0].segment.elevation_low, 10)}</p>
              {segment.map((effort, i) =>
                <p>{(i + 1)}: {this.getUserById(effort.athlete.id).firstname} {effort.moving_time} {(effort.moving_time - segment[0].moving_time)}s</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Fight;
