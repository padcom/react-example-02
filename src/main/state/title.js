export default {
  changeTitle(newTitle) {
    return { type: 'CHANGE_TITLE', payload: newTitle }
  }
}

export const reducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_TITLE':
      return action.payload;
    default:
      return state;
  }
}
