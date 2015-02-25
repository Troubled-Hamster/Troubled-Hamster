var Sidebar = React.createClass({
  render: function(){
    var libraryNodes = this.props.libraries.map(function(library){
      return (
        <li>{library}</li>
      );
    });
    return (
      <div className="Sidebar">
        <h1>Libraries</h1>
        <ul className="LibraryList">
          {libraryNodes}
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;