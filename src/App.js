import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import Administrator from './pages/administrator/Administrator';
import HomePage from './pages/HomePage';
import './tailwind.css';
import './App.css'
import { HelmetProvider } from 'react-helmet-async';

function App() {
 
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>
          
            <Route path="/administrator" >
                <Administrator />
            </Route>

          </Switch>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
