export const JuegoReducer = (state = [], action) => {
  
    switch (action.type) {
        case 'agregar':
            return [...state, action.payload];

        case 'editar':
            let indice = state.findIndex(juego => juego.id === action.payload.id);
            state[indice] = action.payload;
            return [...state];

        case 'eliminar':
            return state.filter(juego => juego.id !== action.payload);

        default:
            return state;

    }

}
