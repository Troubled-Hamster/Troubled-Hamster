var Sidebar = require('./components/Sidebar');
var Documentation = require('./components/Documentation');
var Resources = require('./components/Resources');


var App = React.createClass({

  // getAppState: function(){}

  render: function(){
    return (
      <div className="app">
        <Sidebar />
        <Documentation />
        <Resources />
      </div>
    );
  }
})