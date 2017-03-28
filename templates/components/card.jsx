const React = require('react');

class Button extends React.Component {
  render() {
    const className = `rnf-card ${this.props.className}`;

    return (
      <div className={className}>
        <div className="rnf-card__inner">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Button;
