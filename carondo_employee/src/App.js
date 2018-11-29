import React, { Component } from 'react';
import Login from './components/Login';
import AdminPage from './components/adminComponents/AdminPage';
import StatisticianPage from './components/statisticianComponents/StatisticianPage';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} />} />
          <Route path="/adminPage" render={() => <AdminPage />} />
          <Route path="/statisticianPage" render={() => <StatisticianPage />} />
        </Switch>
      </div >
    );
  }
}