const React = require('react');

class Button extends React.Component {
  render() {
    const className = `rnf-button ${this.props.className}`;

    return (
      <a className={className} href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}

module.exports = Button;
