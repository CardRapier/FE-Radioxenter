import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Login'
import React from 'react';
import User from './Components/Worker/User'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route path="/User" component={User} />
      <Route path="/" component={Login} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
