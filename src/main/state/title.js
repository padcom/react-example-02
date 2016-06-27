// define available actions
export default {
  changeTitle(newTitle) {
    return { type: 'CHANGE_TITLE', payload: newTitle }
  }
}

// define reducer that knows how to deal with the actions defined above
export const reducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_TITLE':
      return action.payload;
    default:
      return state;
  }
}
