export const loginReducer = (state = false, action) => {
  console.log(action);
  switch (action.type) {
    case 'logged in':
      return action.user;
    default:
      return false;
  }
};
