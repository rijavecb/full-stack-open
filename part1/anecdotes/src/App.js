import { useState } from "react";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const getMostPopularAnecdote = () => {
    const highestScore = [...points].sort((a, b) => a - b).pop();
    const anecdote = anecdotes[points.indexOf(highestScore)];

    return {
      anecdote,
      votes: highestScore,
    };
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const { anecdote: anecdoteWithMostVotes, votes } = getMostPopularAnecdote();

  const getNextAnecdote = () => {
    const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    if (randomAnecdoteIndex === selected) {
      getNextAnecdote();

      return;
    }
    setSelected(randomAnecdoteIndex);
  };

  const handleVote = () => {
    const pointsCopy = [...points];
    pointsCopy[selected] += 1;

    setPoints(pointsCopy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={getNextAnecdote}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdoteWithMostVotes} votes={votes} />
    </div>
  );
};

export default App;
