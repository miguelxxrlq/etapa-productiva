// Formulario.jsx — aquí se agregarán nuevos elementos 
import { useState } from 'react'
import './Formulario.css' 
function Formulario() {
const [nuevaTarea, setNuevaTarea] = useState("") 
 const manejarEnvio = (evento) => { 
   evento.preventDefault()
    if (nuevaTarea.trim() === "") {      
         alert("Por favor escribe algo")       
         return     
        }
         alert(`Tarea capturada: ${nuevaTarea}`)     
         setNuevaTarea("")
    }
    return (
        <form className="formulario" onSubmit={manejarEnvio}>
         <h2>Agregar nueva tarea</h2>
        <input        
        type="text" 
        value={nuevaTarea}         
        onChange={(e) => setNuevaTarea(e.target.value)}         
        placeholder="Escribe algo..."       />
        <button type="submit">Agregar</button> 
        </form>
    
    )
}
export default Formulario 



