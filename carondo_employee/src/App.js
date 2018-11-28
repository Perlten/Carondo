import React, { Component } from 'react';
import Login from './components/Login';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} />} />
          <Route path="/adminPage" render={() => <Test/>} />
        </Switch>
      </div >
    );
  }
}

function Test() {
  return(
    <div>
      TEST
    </div>
  );
}

export default App;
