const React = require('react');

class Hero extends React.Component {
  render() {
    return (
      <section className="rnf-hero">
        {this.props.children}
      </section>
    );
  }
}

module.exports = Hero;
