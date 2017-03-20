let React = require('react');

class Card extends React.Component {
  render() {
    let image;

    if (this.props.img.src && this.props.img.src.indexOf('http') === 0) {
      image = <img src={this.props.img.src} alt={this.props.img.alt} />
    }

    return (
      <div>
        {image}
        <div>
          <p>{this.props.title}</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Card;
