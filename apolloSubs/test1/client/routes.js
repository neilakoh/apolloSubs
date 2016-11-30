import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Core from './core/core';
import MainPage from './mainPage/mainPage';


export default (
  <Route path="/" component={Core}>
    <IndexRoute component={MainPage} />
  </Route>
);
