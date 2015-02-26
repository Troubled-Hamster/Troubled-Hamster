var Documentation = React.createClass({
  render: function() {
    return (
      <div className="documentation">{this.props.library}</div>
    );
  }
});

module.exports = Documentation;