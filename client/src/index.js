import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';
import './index.css';

// Containers
import Home from './containers/Home';
import Notifications from './containers/Notifications';
import Login from './containers/Login';
import Register from './containers/Register';

// Components
import Navbar from './components/Navbar';

const user = { username: 'EliasJohansson' };

const App = () => (
  <Router>
    <React.Fragment>

      <Navbar user={user} />

      <div className="container">

        {/* ROUTES */}
        <ProtectedRoute path="/" exact component={Home} isAuthenticated={!!user} />
        <ProtectedRoute path="/notifications" component={Notifications} isAuthenticated={!!user} />

        {/* AUTH ROUTES */}
        <Route path="/login" render={() => <Login isAuthenticated={!!user} />} />
        <Route path="/register" render={() => <Register isAuthenticated={!!user} />} />

      </div>


    </React.Fragment>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
