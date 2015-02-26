var Documentation = React.createClass({
  render: function() {
    var methodNodes = this.props.methods.map(function(method){
      return (
        <li>{method}</li>
      );
    });
    return (
      <div className="documentation">
        {this.props.library}
        <ul className="methods">
          {methodNodes}
        </ul>
      </div>
    );
  }
});

module.exports = Documentation;