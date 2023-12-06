import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateVotes(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
  },
});

export const {  appendAnecdote, setAnecdotes, updateVotes} = anecdoteSlice.actions;

export const initializeAnecdotes= () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (id, content, votes) => {
  return async dispatch => {
    const newAnecdote = {
      content: content,
      votes: votes+1
    }
    await anecdoteService.update(id, newAnecdote );
    dispatch(updateVotes(id))
  }
}

export default anecdoteSlice.reducer;
