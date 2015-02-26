var StackOverflow = require('./StackOverflow');
var Examples = require('./Examples');

var Resources = React.createClass({
  render: function(){
    return (
      <div className="resources">
        <h1>{this.props.method}</h1>
        <StackOverflow />
        <Examples />
      </div>
    );
  }
});

module.exports = Resources;