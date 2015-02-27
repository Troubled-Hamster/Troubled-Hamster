var Question = React.createClass({

  render: function(){
    var answerNodes = []
    for (var answer in this.props.answers){
      answerNodes.push(<div className="answer">{answer.body}</div>)
    }
    return (
      <div className="stack">
      <h1 className="title">{this.props.title}</h1>
        <div className="question hidden">{this.props.body}</div>
        <div className="answers hidden">{this.props.answers}</div>
      </div>
    );
  }

});

module.exports = Question;