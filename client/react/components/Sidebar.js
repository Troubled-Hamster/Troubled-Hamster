var Library = require('./Library')

var Sidebar = React.createClass({
  render: function(){
    var libraryNodes = this.props.libraryData.map(function(library){
      return (
        <Library library={library}/>
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
