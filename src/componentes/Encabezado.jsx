// Encabezado.jsx — título y presentación de la app
import  '</Encabezado.css'
function Encabezado({titulo, subtitulo}) {
    return (
        <header className="encabezado">
            <h1 className="encabezado_titulo">{titulo}</h1>
            <p className="encabezado_subtitulo">{subtitulo}</p>
        </header>
    )
}

export default Encabezado 