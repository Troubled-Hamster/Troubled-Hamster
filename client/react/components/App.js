var Sidebar = require('./Sidebar');
var Documentation = require('./Documentation');
var Resources = require('./Resources');

var data = ['underscore', 'backbone', 'node'];
var library = 'iefhqeifweifh';
var method = '';

var App = React.createClass({

  // getAppState: function(){},

  getInitialState: function() {
    return {
      libraries: data,
      library: library,
      method: method
    }
    // return getTodoState();
  },

  render: function(){
    return (
      <div className="app">
        <Sidebar libraries={this.state.libraries} />
        <Documentation library={this.state.library} />
      </div>
    );
  }
});

module.exports = App;
