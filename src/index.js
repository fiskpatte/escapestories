import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/menu';
import Calendar from './components/calendar';

ReactDOM.render(
    <div>
        <Menu/>
        <Calendar/>
    </div>,
    document.getElementById('app')
);
