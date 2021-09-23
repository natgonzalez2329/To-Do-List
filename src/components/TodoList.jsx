import React from 'react'
import TodoItem from './TodoItem'

export function TodoList({ tasks, toggleTask }) {
  return (
    <ul>{tasks.map((task) => (
      /* cada hijo de la lista debería tener una propiedad key única, esto se debe a que 
      react al renderizar listas necesita saber que elemnto es en concreto para que su rendimiento 
      sea óptimo y pueda distinguir de si es un componente u otro en ese árbol de componentes que está creando */
      <TodoItem key={task.id} task={task} toggleTask={toggleTask} />
    ))}</ul>
  )
}
