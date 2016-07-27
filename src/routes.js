import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Menu from './components/menu';
import About from './components/about';
import Calendar from './components/calendar';
import Contactinfo from './components/contactinfo';
import Form from './components/form';

const routes = (
  <Route path="/" component={Menu} >
    <IndexRoute component={About} />
    <Route path="/boka" component={Calendar} />
    <Route path="/avsluta/:slot/:time" component={Form} />
    <Route path="/about" component={About} />
  </Route>
);

export default routes;
