import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({ good, neutral, bad, total }) => {
  const Average = () =>{
    let goodVal = 1 * good
    let neutVal = 0 * neutral
    let badVal = -1 * bad
    return((goodVal + neutVal + badVal) / total)
  }

  const Positive = () => good / total + ' %'
  
  if ( total > 0) {
    return (
      <table>
        <tbody>
          <Body text='Good ' value={good} />
          <Body text='Neutral ' value={neutral} />
          <Body text='Bad ' value={bad} />
          <Body text='All' value={total} />
          <Body text='Average ' value={Average()} />
          <Body text='Positive ' value={Positive()} />
        </tbody>
      </table>
    )
  } else {
    return ( 
      <>No feedback given</> 
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () =>  {
    setGood(good + 1) 
    increaseTotal()
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    increaseTotal()
  }
  const increaseBad = () => {
    setBad(bad + 1)
    increaseTotal()
  }

  const increaseTotal = () => setTotal(total + 1)

  return (
    <div>
      <Header text='Give feedback' />
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
      <Header text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Body = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)

