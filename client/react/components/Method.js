var Actions = require('../actions/actions');

var Method = React.createClass({

  query: function(event) {
    Actions.selectMethod(this.props.library, this.props.method);
  },

  render: function() {
    return (
      <button onClick={this.query}>{this.props.method}</button>
    );
  }
});

module.exports = Method;

//{function(){console.log('hi')}