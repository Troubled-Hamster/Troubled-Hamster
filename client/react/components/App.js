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
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div className="app">
        <Sidebar libraries={this.state.libraries} />
        <Documentation library={this.state.library} methods={this.state.methods}/>
        <Resources method={this.state.method}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(AppStore.getSelection());
  }

});

module.exports = App;
