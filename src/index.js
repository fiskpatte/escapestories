import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory, browserHistory } from 'react-router';
import { createHashHistory } from 'history';

import routes from './routes';

const appHistory = useRouterHistory(createHashHistory)()

ReactDOM.render(
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>,
    document.getElementById('app')
);
