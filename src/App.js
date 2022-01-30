import React, { useRef, useEffect } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { usePrevious } from './services/usePrevious';

const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState('All');
	const listHeadingRef = useRef('null');
	const previousTaskLength = usePrevious(tasks.length);
	useEffect(() => {
		if (tasks.length - previousTaskLength < 0) {
			listHeadingRef.current.focus();
		}
	}, [tasks.length, previousTaskLength]);
	const taskList = tasks
		.filter(FILTER_MAP[filter])
		.map((task) => (
			<Todo
				id={task.id}
				name={task.name}
				completed={task.completed}
				key={task.id}
				toggleTaskCompletion={toggleTaskCompletion}
				deleteTask={deleteTask}
				editTask={editTask}
			/>
		));
	const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
	const headingText =
		taskList.length === 0
			? 'No tasks'
			: `${taskList.length} ${tasksNoun} remaing`;
	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	function addTask(name) {
		const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
		setTasks([newTask, ...tasks]);
		setFilter('All');
	}

	function toggleTaskCompletion(id) {
		const updatedTaskList = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});

		setTasks(updatedTaskList);
	}

	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => task.id !== id);
		setTasks(remainingTasks);
	}

	function editTask(id, name) {
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, name: name };
			}
			return task;
		});

		setTasks(updatedTasks);
	}

	return (
		<div className='todoapp stack-large'>
			<h1>TodoMatic</h1>
			<Form addTask={addTask} />
			<div className='filters btn-group stack-exception'>{filterList}</div>
			<h2 id='list-heading' ref={listHeadingRef} tabIndex='-1'>
				{headingText}
			</h2>
			<ul
				className='todo-list stack-large stack-exception'
				aria-labelledby='list-heading'>
				{taskList}
			</ul>
		</div>
	);
}

export default App;
