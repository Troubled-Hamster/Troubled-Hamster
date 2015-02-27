var StackStore = require('../store/StackStore');

var StackOverflow = React.createClass({

  getInitialState: function() {
    return {items: [{
      title: '',
      body: 'CLICK ON A METHOD TO SEE STACK OVERFLOW CONTENT',
      answers: ''
    }]}
  },

  componentDidMount: function() {
    StackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StackStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var stackQAs = this.state.items.map(function(question){
      return (
        <div className="stack">
        <h1 className="title">{question.title}</h1>
          <div className="question hidden">{question.body}</div>
          <div className="answer hidden">{question.answers}</div>
        </div>
      );
    });
    return (
      <div className="StackOverflow">
        {stackQAs}
      </div>
    );
  },

  _onChange: function() {
    this.setState(StackStore.getStackData());
  }

});

module.exports = StackOverflow;