// setup
import anecdoteService from '../services/anecdoteService';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

//# actual functions here

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const itemToChange = state.find((n) => n.id === id);
      const changedItem = {
        ...itemToChange,
        votes: itemToChange.votes + 1,
      };
      return state.map((item) => (item.id !== id ? item : changedItem));
    case 'NEW_ITEM':
      return [...state, action.data];
    case 'INIT_ITEMS':
      return action.data;
    default:
      return state;
  }
};

export const createVote = (id) => {
  return async (dispatch) => {
    const newItem = await anecdoteService.vote(id);
    dispatch({
      type: 'VOTE',
      data: { id },
    });
  };
};

export const initializeItems = () => {
  return async (dispatch) => {
    const items = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ITEMS',
      data: items,
    });
  };
};

export const createItem = (data) => {
  return async (dispatch) => {
    const newItem = await anecdoteService.createNew(data);
    dispatch({
      type: 'NEW_ITEM',
      data: newItem,
    });
  };
};

export default anecdoteReducer;
