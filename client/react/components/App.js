var Sidebar = require('./Sidebar');
var Documentation = require('./Documentation');
var Resources = require('./Resources');
var AppStore = require('../store/AppStore');

// var data = ['underscore', 'backbone', 'node'];
// var library = 'iefhqeifweifh';
// var method = '';

var App = React.createClass({

  // getAppState: function(){},

  getInitialState: function() {
    return AppStore.getSelection();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    var libraryData = [];
    var libraries = this.state.libraries;
    var len = libraries.length;
    var context = this;
    libraries.forEach(function(library, index) {
      $.ajax({
        url: 'http://localhost:3000/test',
        dataType: 'json',
        success: function(data) {
          console.log('successfully fetched data for library ', library);
          libraryData.push({
            name: library,
            data: data
          });
          context.setState({
            libraries: libraries,
            libraryData: libraryData
          });
        },
        error: function(xhr, status, err) {
          console.error('error getting data for library ', library);
        }
      });
    });
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div className="app">
        <Sidebar libraryData={this.state.libraryData} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(AppStore.getSelection());
  }

});

module.exports = App;
        // <Documentation library={this.state.library} methods={this.state.methods}/>
        // <Resources method={this.state.method}/>
