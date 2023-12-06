import { incrementVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }
  });

  const sortedAnecdotes = anecdotes.slice().sort(
    (a, b) => {
      return b.votes - a.votes;
    },
  );
  console.log(sortedAnecdotes)

  const vote = (id, content, votes) => {
    console.log("vote", id);
    dispatch(incrementVote(id, content, votes));
    dispatch(setNotification(`you voted '${content}'`, 5));
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
