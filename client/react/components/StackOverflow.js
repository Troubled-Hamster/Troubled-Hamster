var StackStore = require('../store/StackStore');
var Question = require('./Question');

var StackOverflow = React.createClass({

  getInitialState: function() {
    return {questions: [{
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
    var stackQAs = this.state.questions.map(function(question){
      return (
        <Question title={question.title} body={question.body} answers={question.answers} />
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