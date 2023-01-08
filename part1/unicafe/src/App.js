import { useState } from 'react'

const Button = ({ onButtonClick, text }) =>
    <button onClick={onButtonClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = ((good - bad) / all) || 0
  const positive = (good / all) * 100 || 0

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
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    </div>
  )
}

export default App