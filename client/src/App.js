import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle';

import Home from './components/home.component';
import Contact from './components/contact.component';
import Experience from './components/experience.component';
import Education from './components/education.component';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/experience">
        <Experience />
      </Route>
      <Route path="/education">
        <Education />
      </Route>
    </Switch>  
    <footer className="px-4 text-center">
      <hr />
      <p>Tanner Hill – Western Oregon University {new Date().getFullYear()}</p>
    </footer>
    </Router>
    
  );
}

export default App;
