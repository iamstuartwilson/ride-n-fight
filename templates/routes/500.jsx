let React = require('react');
let Layout = require('../layouts/default');

class Route500 extends React.Component {
  render() {
    const head = {
      title: '500'
    };

    return (
      <Layout head={head}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h1>Something's not right...</h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Route500;
