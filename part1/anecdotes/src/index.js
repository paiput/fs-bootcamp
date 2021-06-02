import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = ({ anecdotes, votes }) => {
  const [selected, setSelected] = useState(0)
  const [selectedVotes, setSelectedVotes] = useState([...votes])

  const changeAnecdote = () => {
    setSelected(anecdote => {
      if (anecdote < anecdotes.length - 1) return anecdote + 1;
      return anecdote = 0;
    });
  }
  
  // console.log('selected:', selected)
  console.log('votes:', selectedVotes)
  console.log('selected votes:', selectedVotes[selected])
  const changeVotes = () => setSelectedVotes(selectedVotes.map((vote, index) => {
    if (index === selected) vote += 1;
    return vote;
  }))
  
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {selectedVotes[selected]} votes</p>
      <button onClick={changeVotes}>vote</button>
      <button onClick={changeAnecdote}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const anecdotesVotes = Array(anecdotes.length).fill(0);

ReactDOM.render(
  <App anecdotes={anecdotes} votes={anecdotesVotes} />,
  document.getElementById('root')
)