import React from 'react';

class Hero extends React.Component {
  render() {
    return (
      <section className="rnf-hero">
        {this.props.children}
      </section>
    );
  }
}

export default Hero;
