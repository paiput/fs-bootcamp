import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const RateButton = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
}

const RatingDisplay = ({ title, value }) => <p>{title}: {value}</p>;

const NotDisplayedStatistics = () => <p>No feedback given</p>

const Statistics = ({ values }) => {
  
  const calcAverage = () => ((values.good - values.bad) / (values.good + values.neutral + values.bad)).toFixed(2);
  const calcPositive = () => values.good / (values.good + values.neutral + values.bad)

  return (
    <div>
      <h2>Statistics</h2>
      <RatingDisplay title='good' value={values.good} />
      <RatingDisplay title='neutral' value={values.neutral} />
      <RatingDisplay title='bad' value={values.bad} />
      <RatingDisplay title='all' value={values.good + values.neutral + values.bad} />
      <RatingDisplay title='average' value={isNaN(calcAverage()) ? '' : calcAverage() } />
      <RatingDisplay title='positive' value={isNaN(calcPositive()) ? '' : `${calcPositive()}%`} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <RateButton title='good' onClick={() => setGood(prevValue => prevValue + 1)} />
      <RateButton title='neutral' onClick={() => setNeutral(prevValue => prevValue + 1)} />
      <RateButton title='bad' onClick={() => setBad(prevValue => prevValue + 1)} />
      
      {(good + neutral + bad === 0) 
        ? <NotDisplayedStatistics /> 
        : <Statistics values={{good, neutral, bad}} />}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);