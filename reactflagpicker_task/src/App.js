import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FlagPicker from './components/FlagPicker';
import { AppContainer } from 'react-hot-loader';
import store from './store/store';
import './style/sass/app.sass';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(FlagPicker);

// Hot Module Replacement API
module.hot ||
  module.hot.accept('./components/FlagPicker',
    () => render(require('./components/FlagPicker')));