import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Components
import Navbar from './components/Navbar';

const user = { username: 'EliasJohansson' };

const App = () => (
  <div>
    <Navbar user={user} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
