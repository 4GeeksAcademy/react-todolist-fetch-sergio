import React from "react";
import { useState, useEffect } from "react";

const Home = () => {

	const [task, setTask] = useState(" ");
	const [taskList, setList] = useState([]);
	const [visible, setVisible] = useState("none");
	const [hoverIndex, setHoverIndex] = useState(null);

	// FETCH
	function createUser() {		
		fetch('https://playground.4geeks.com/apis/fake/todos/user/smontoro17', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			}
			})
			.then(resp => resp.json()
			)
			.then(data => {console.log("Nuevo usuario creado"), data})
			.catch(error => {
				console.log(error);
			});
	}

	function getTasks() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/smontoro17', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			})
			.then(resp => resp.json()
			)
			.then(data => {
				setList(data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function updateTasks(dinamicList) {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/smontoro17', {
			method: "PUT",
			body: JSON.stringify(dinamicList),
			headers: {
				"Content-Type": "application/json"
			},
			})
			.then(resp => resp.json()
			)
			.then(data => {})
			.catch(error => {
				console.log(error);
			});
	}

	// EVENTOS Y ACTUALIZACIÓN DEL ARRAY DE TAREAS (AÑADIR/ELIMINAR TAREA)
	function taskInput(event) {
		setTask({label: event.target.value, done: false});
	}

	function addItem(event) {
		if(event.keyCode === 13) {
			const dinamicList = [...taskList, task];
			setList(dinamicList);

			event.target.value = "";

			updateTasks(dinamicList);
			
			getTasks();
		}		
	}

	function deleteItem(deletedItem) {
		const modifiedTaskList = taskList.filter((item) => item !== deletedItem);
		setList(modifiedTaskList);

		updateTasks(modifiedTaskList);
	}

	// FUNCIONES DE LA PRIEMRA CARGA DE LA PÁGINA
	useEffect(() => {
		createUser();
		getTasks();
	},[]);
	
	// FUNCIONES DE ESTILOS
	function showButton(index) {
		setVisible("block");
		setHoverIndex(index);
	}

	function hideButton() {
		setVisible("none");
	}

	return (
		<div className="d-flex card w-25 mx-auto p-4 bg-dark">
			<div className="card-title text-center">
				<h1 className="text-white p-3">TO DO LIST</h1>
			</div>
			<input type="text" className="form-control" onChange={taskInput} onKeyDown={addItem} placeholder="Add your task here"/>
			<ul className="list-group">
				{taskList.map((item, index) => (
         			 <li className="d-flex justify-content-between align-items-center list-group-item" key={index} onMouseEnter={() => showButton(index)} onMouseLeave={hideButton}>{item.label}<button className="btn btn-light" onClick={() => deleteItem(item)} style={{display: hoverIndex === index ? visible : "none"}}>X</button></li>
       			))}
			</ul>
			<div className="text-white mt-4">
				<span>{taskList.length} items left</span>
			</div>
		</div>
	);
};

export default Home;