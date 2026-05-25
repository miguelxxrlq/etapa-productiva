import Item from './Item'
import './Lista.css'

function Lista({ tareas, alEliminar }) {
  return (
    <ul className="lista">
      {tareas.map(tarea => (
        <Item
          key={tarea.id}
          tarea={tarea}
          alEliminar={alEliminar}
        />
      ))}
    </ul>
  )
}

export default Lista 