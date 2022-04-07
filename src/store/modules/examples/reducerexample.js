const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'BOTAO_CLICADO':
      console.log('estou botao clicado')
      return state

    default:
      return state
  }
}
