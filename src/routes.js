import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Menu from './components/menu';
import Home from './components/home';
import Calendar from './components/calendar';
import Contactinfo from './components/contactinfo';
import Form from './components/form';
import HowToPlay from './components/howtoplay';

const routes = (
  <Route path="/" component={Menu} >
    <IndexRoute component={Home} />
    <Route path="/boka" component={Calendar} />
    <Route path="/avsluta/:slot/:time" component={Form} />
    <Route path="/howtoplay" component={HowToPlay} />
    <Route path="/about" component={Contactinfo} />
  </Route>
);

export default routes;
