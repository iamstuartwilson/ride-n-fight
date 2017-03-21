let React = require('react');

class LayoutDefault extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>
          {this.props.head.title ? `${this.props.head.title} | ` : ''}
          Ride-n-Fight
        </title>
        <link rel="stylesheet" type="text/css" href="/css/styles.css" />
      </head>
      <body>
        {this.props.children}
        <script type="text/javascript" src="/js/bundle.js"></script>
      </body>
      </html>
    );
  }
}

module.exports = LayoutDefault;
