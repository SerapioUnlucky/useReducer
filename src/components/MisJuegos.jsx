import React, { useEffect } from 'react'
import { JuegoReducer } from '../hook/JuegoReducer';

const init = () => {

    return JSON.parse(localStorage.getItem('juegos')) || [];

}

export const MisJuegos = () => {

    const [juegos, dispatch] = React.useReducer(JuegoReducer, [], init);

    useEffect(() => {

        localStorage.setItem('juegos', JSON.stringify(juegos));

    }, [juegos]);

    const conseguirDatos = (e) => {

        e.preventDefault();

        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value
        }

        const action = {
            type: 'agregar',
            payload: juego
        };

        dispatch(action);

        e.target.reset();

    }

    const editarDatos = (e, id) => {

        let juego = {
            id,
            titulo: e.target.value
        }

        const action = {
            type: 'editar',
            payload: juego
        };

        dispatch(action);

        location.reload();

    }

    const eliminarDatos = (id) => {

        const action = {
            type: 'eliminar',
            payload: id
        };

        dispatch(action);

    }

    return (

        <div>

            <h1>Mis juegos</h1>

            <p>Número de juegos: {juegos.length}</p>

            <ul>
                {juegos.map(juego => (
                    <li key={juego.id}>
                        
                        {juego.titulo}

                        &nbsp;

                        <button onClick={(e) => eliminarDatos(juego.id)}>X</button>

                        &nbsp;

                        <input type="text" onBlur={(e) => editarDatos(e, juego.id)} onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                editarDatos(e, juego.id)
                            }
                        }}/>

                    </li>
                ))}
            </ul>

            <h3>Agregar juego</h3>

            <form onSubmit={conseguirDatos}>
                <input type="text" name='titulo' placeholder="Nombre del juego" />
                <input type="submit" value="Guardar" />
            </form>

        </div>

    )

}
