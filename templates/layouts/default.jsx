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
        <link rel="stylesheet" type="text/css" href="/build/css/styles.css" />
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Ride-n-Fight</a>
          </nav>
        </header>
        {this.props.children}
        <script type="text/javascript" src="/build/js/bundle.js"></script>
      </body>
      </html>
    );
  }
}

module.exports = LayoutDefault;
