import Item from "./Item"

// Lista.jsx — mostrará todos los items 
function Lista({ tareas}) {
    return (
        <ul className="lista">
            {tareas.map(tarea => (
                 <Item key={tarea.id} tarea={tarea}  /> 
            ))}
        </ul>
       
    )
}
export default Lista    