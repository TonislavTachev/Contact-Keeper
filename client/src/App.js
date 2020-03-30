import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About';
import ContactState from './context/Contact/ContactState'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AlertState from './context/Alert/AlertState';
import AuthState from './context/Auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App= ()=> {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <Fragment className="App">
      <Navbar/>
      <div className='container'>
        <Switch>
          <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          <Route exact path="/about" component={About}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
        </Switch>
      </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>

  );
}

export default App;
