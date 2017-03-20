let React = require('react');
let Layout = require('../layouts/default');

class Route404 extends React.Component {
  render() {
    const head = {
      title: '404'
    };

    return (
      <Layout head={head}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h1>Page not found</h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Route404;
