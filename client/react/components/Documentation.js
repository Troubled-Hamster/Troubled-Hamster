var Method = require('./Method');

var Documentation = React.createClass({

  render: function() {
    var lib = this.props.library
    var methodNodes = this.props.methods.map(function(method){
      return (
        <li>
        <Method library={lib} method={method}></Method>
        </li>
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