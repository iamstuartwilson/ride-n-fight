let React = require('react');

class Card extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.image.src} alt={this.props.image.alt} />
        <p>{this.props.title}</p>
      </div>
    );
  }
}

module.exports = Card;
