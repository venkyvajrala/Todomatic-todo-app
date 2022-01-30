import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DATA = [
	{ id: 'todo-0', name: 'Eat', completed: true },
	{ id: 'todo-1', name: 'Sleep', completed: false },
	{ id: 'todo-2', name: 'Repeat', completed: false },
];

ReactDOM.render(
	<React.StrictMode>
		<App subject='React' tasks={DATA} />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
