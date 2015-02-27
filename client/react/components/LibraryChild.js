var LibraryChild = React.createClass({
  getInitialState: function() {
    return {
      buttonState: '+',
      grandChildClass: 'grandchild hidden'
    };
  },
  expandGrandChildren: function() {
    console.log('expanding grandchildren');
    if (this.state.grandChildClass === 'grandchild hidden') {
      this.setState({
        buttonState: '-',
        grandChildClass: 'grandchild'
      });
    } else {
      this.setState({
        buttonState: '+',
        grandChildClass: 'grandchild hidden'
      });
    }
  },
  render: function() {
    var name = this.props.data.name;
    var grandChildClass = this.state.grandChildClass;
    var libraryGrandChildren = this.props.grandChildren.map(function(grandChild) {
      if (grandChild.type === name) {
        var path = 'http://maxcdn-docs.devdocs.io/underscore/' + grandChild.path.split('#')[0] + '.html#' + grandChild.path.split('#')[1];
        return (
          <ul className={grandChildClass}>
            <a href={path}>{grandChild.name}</a>
          </ul>
        );
      }
    });
    return (
      <div className={this.props.childClass}>
        <button onClick={this.expandGrandChildren}>{this.state.buttonState}</button>
        {this.props.data.name}
        {libraryGrandChildren}
      </div>
    );
  }
});

module.exports = LibraryChild;
