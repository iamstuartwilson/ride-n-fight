const React = require('react');

class Header extends React.Component {
  render() {
    return (
      <header className="rnf-header">
        <nav className="container">
          <a href="/" className="rnf-header__logo">Ride-n-Fight</a>
        </nav>
      </header>
    );
  }
}

module.exports = Header;
