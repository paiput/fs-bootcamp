import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const RateButton = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>
}

const RatingDisplay = ({ title, value }) => <p>{title}: {value}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const setRating = (quality) => {

  // }

  return (
    <div>
      <h2>Give feedback</h2>
      <RateButton title='good' onClick={() => setGood(prevValue => prevValue + 1)} />
      <RateButton title='neutral' onClick={() => setNeutral(prevValue => prevValue + 1)} />
      <RateButton title='bad' onClick={() => setBad(prevValue => prevValue + 1)} />
      
      <h2>Statistics</h2>
      <RatingDisplay title='good' value={good} />
      <RatingDisplay title='neutral' value={neutral} />
      <RatingDisplay title='bad' value={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);