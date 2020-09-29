import React from 'react';
import Login from './Components/Login'
import User from './Components/Worker/User'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

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
