let React = require('react');
let Layout = require('../layouts/default');
let Card = require('../card');

class RouteIndex extends React.Component {
  render() {
    const riderNames = [];
    const segments = [];
    const scores = {};

    this.props.users.forEach((user) => {
      riderNames.push(user.athlete.firstname);
      scores[user.athlete.id] = 0;
    });

    const time = this.props.activities[0].start_date.split('T').shift();
    const title = `${riderNames.join(' vs ')} ${time}`;

    for (const segmentId in this.props.segments) {
      let segment = this.props.segments[segmentId];

      let winner = this.props.users.filter((user) => {
        return user.athlete.id === segment[0].athlete.id;
      }).shift();

      scores[winner.athlete.id] ++;

      segments.push({
        title: segment[0].name,
        time: Math.round(segment[0].elapsed_time / 60, 10),
        diff: segment[1].elapsed_time - segment[0].elapsed_time,
        winner
      });
    }

    let winner = this.props.users[0];
    let loser = this.props.users[1];

    if (scores[this.props.users[1].athlete.id] > scores[this.props.users[0].athlete.id]) {
      winner = this.props.users[1];
      loser = this.props.users[0];
    }

    return (
      <Layout head={{
        title: title
      }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h1>{title}</h1>

              <h2>Overall winner is {winner.athlete.firstname}! ({scores[winner.athlete.id]} - {scores[loser.athlete.id]})</h2>

              <h2>Segments</h2>
              {segments.map((segment) =>
                <div>
                  <h3>{segment.title}</h3>
                  <p>{segment.winner.athlete.firstname}: {segment.time} mins (+{segment.diff}s)</p>
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
