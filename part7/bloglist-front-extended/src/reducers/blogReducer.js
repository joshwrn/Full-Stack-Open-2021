import blogs from '../services/blogs';

export const initializeItems = () => {
  return async (dispatch) => {
    const items = await blogs.getAll();
    dispatch({
      type: 'INIT_ITEMS',
      data: items,
    });
  };
};

export const blogReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case 'INIT_ITEMS':
      return action;
    default:
      return [];
  }
};
