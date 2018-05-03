import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import LeaguePage from './React/Pages/LeaguePage';
import store from './Redux/Store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <LeaguePage />
      </Provider>
    );
  }
}

export default App;
