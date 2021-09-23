import React from 'react'

export default function TodoItem({ task, toggleTask }) {
  const { id, todo, completed } = task;
  const check = () => {
    toggleTask(id);
  }
  return (
    <li>
      <input type="checkbox" checked={ completed } onChange={ check } /> 
      { todo }
    </li>
  )
}
//flujo de propiedades y eventos. las propiedades se pasan desde el componente más arriba al más abajo y los eventos van desde el de abajo al componente superior.