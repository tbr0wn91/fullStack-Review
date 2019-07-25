import React from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import Login from './components/Home/Login';

import './App.css';

function App() {
  return ( 
  <div>
    <header>
      <div>
        <NavLink exact to='/' activeClassName='active'>Home </NavLink>
        <NavLink exact to='/kill_map' activeClassName='active'>Killmap</NavLink>
        <NavLink exact to='profile' activeClassName='active'>Profile</NavLink>
      </div>
    </header>

    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/kill_map" render={() => {
        return <div>This is the killmap path</div>
      }}/>/>
      <Route path="/profile" render={() => {
        return <div>This is the profile path</div>
      }}/>/>
      <Route path="*" render={() => {
        return <div>YALL BEEN ZAPPED BY ALIENS</div>
      }}/>/>

    </Switch>

  </div>
    
  );
}

export default App;
