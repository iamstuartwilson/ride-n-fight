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
        <header className="rnf-header">
          <nav className="container">
            <a href="/" className="rnf-header__logo">Ride-n-Fight</a>
          </nav>
        </header>
        {this.props.children}
        <script type="text/javascript" src="/js/bundle.min.js"></script>
      </body>
      </html>
    );
  }
}

module.exports = LayoutDefault;
