const React = require('react');
const Header = require('../components/header');
const Footer = require('../components/footer');

class LayoutDefault extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {this.props.head.title ? `${this.props.head.title} | ` : ''}
          Ride-n-Fight
        </title>
        <link rel="stylesheet" type="text/css" href="/css/styles.css" />
      </head>
      <body>
        <Header />
        {this.props.children}
        <Footer />
        <script type="text/javascript" src="/js/bundle.min.js"></script>
      </body>
      </html>
    );
  }
}

module.exports = LayoutDefault;
