var ExampleStore = require('../store/ExampleStore');

var Examples = React.createClass({

  getInitialState: function() {
    return {items: [{
      code: 'CLICK ON A METHOD TO SEE EXAMPLES'
    }]}
  },

  componentDidMount: function() {
    ExampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ExampleStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var exampleNodes = this.state.items.map(function(example){
      return (
        <div>{example.code}</div>
      );
    });
    return (
      <div className="examples">
      <h1>CODE EXAMPLES</h1>
        {exampleNodes}
      </div>
    );
  }, 

  _onChange: function() {
    this.setState(ExampleStore.getExamples());
  }

});

module.exports = Examples;