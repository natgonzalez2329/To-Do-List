/* import logo from './logo.svg'; */
import './App.css';
import React, { Fragment, useState, useRef, useEffect } from 'react'; // método que le da la propiedad que cada vez que lo que se haya guardado en el estado cambia, se renderiza el componente
// el useState es un array que devuelve dos propiedades, una que devuelve la función en sí y la otra es la función que hace modificar ese estado.
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from "uuid";

/*useEffect hook que nos permite ejecutar código en el momento en el que se crea el componente, es como un método de ciclo de vida que había antiguamente,
que nos permite acceder en momentos concretos del ciclo de vida del componente, cuando se crea, se destruye, etc.,
recibe una función de callback, y  un array de dependencias que si esta vacio, hace que se ejecute solo la función del callback cuando se crea el componente, es decir 
al inicio y ya esta. pero si quieres que se ejecute continuamente cuando estas añadiendo nuevas cosas ps hay que poner en el aray las variables o las dependencias que quieres que este escuchando para que 
ejecutar ese useEffect o no. entonces si queremos que cada vez que se agregue una tarea al localStorage en el array debemos poner a escuchar el tasks
y en el callback la accion que quiero que se desencadene y debemos pasarle el JSON.stringify lo que hacemos es convertir un array en string, porque el localStorage solo almacena cadena d texto, no puede almacenar 
array u objetos y luego el método parse si ese string está bien creado, lo puedes transformar de nuevo a un array u objeto*/ 
const KEY = 'tasksApp.tasks'

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", todo: "Task1", completed: false }
  ]);

  const taskRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(KEY));
    if(storedTasks) {
      setTasks(storedTasks);
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }, [tasks]);

  

  const toggleTask = (id) => {
    const newTaskCheckbox = [...tasks];
    const taskCheckbox = newTaskCheckbox.find((task) => task.id === id);
    taskCheckbox.completed = !taskCheckbox.completed;
    setTasks(newTaskCheckbox);
  }

  const addTasks = () => {
    const newTask = taskRef.current.value;
    if(newTask === '') return;

    setTasks((prevTasks) => {
      return [...prevTasks, { id: uuidv4(), todo: newTask, completed: false }]
    });

    taskRef.current.value = null;
  };

  const clearTasksChecked = () => {
    const newTaskChecked = tasks.filter((task) => !task.completed);
    setTasks(newTaskChecked);
  }

  return (
    <Fragment>
      <input ref={taskRef} type="text" placeholder="New Task"/>
      <button onClick={ addTasks }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
        </svg></button>
      <button onClick={ clearTasksChecked }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg></button>
      <div>There are {tasks.filter((task) => !task.completed).length} tasks to finish</div>
      <TodoList tasks = { tasks } toggleTask={toggleTask}/>      
    </Fragment>
  );
}



/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          TO DO LIST
        </a>
      </header>
    </div>
  );
} */

export default App;
