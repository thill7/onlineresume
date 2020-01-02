import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './components/home.component';
import Contact from './components/contact.component';

function App() {
  return (
    <Router>
    <Link to="/">Home</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/experience">Experience</Link>
    <Link to="/education">Education</Link>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/experience">
        <h2>Experience</h2>
      </Route>
      <Route path="/education">
        <h2>Education</h2>
      </Route>
      </Switch>  
    </Router>
  );
}

export default App;
