import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return <p>{text} {value} %</p>
  }

  return <p>{text} {value}</p>
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all) || 0
  const positive = (good / all) * 100 || 0

  if (!all) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}

const Button = ({ onButtonClick, text }) =>
    <button onClick={onButtonClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button onButtonClick={() => setGood(good + 1)} text="good" />
        <Button onButtonClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onButtonClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App