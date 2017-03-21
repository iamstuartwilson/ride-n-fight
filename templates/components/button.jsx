const React = require('react');

class Button extends React.Component {
  render() {
    this.className = `rnf-button ${this.props.className}`;

    return (
      <a className={this.className} href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}

module.exports = Button;
