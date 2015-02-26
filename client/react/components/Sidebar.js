var Library = React.createClass({
  getInitialState: function() {
    console.log('setting initial state');
    this.state.data = {};
  },
  componentWillMount: function() {
    $.ajax({
      url: 'http://maxcdn-docs.devdocs.io/' this.props.library + '/index.json',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err);
      }.bind(this)
    });
  },
  expand: function() {
    console.log(this.state.json);
  },
  render: function() {
    return (
      <div class="library">
        <button onClick=this.expand>exp</button>
        {this.props.library}
        <SubList data={this.state.data}/>
      </div>
    );
  }
});

var Sidebar = React.createClass({
  render: function(){
    var libraryNodes = this.props.libraries.map(function(library){
      return (
        // <li>{library}</li>
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
