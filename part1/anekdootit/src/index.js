import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  let mostVotes = 0
  
  const Vote = () => {
    const arr = votes.slice()
    arr[selected] += 1
    setVotes(arr)
  }

  const selectRandom = () => {
    const min = 0;
    const max = 5.9;
    const rand = Math.floor(min + Math.random() * (max - min))
    setSelected(rand)
  }

  useEffect(() => {
    const arr = votes.slice()
    arr.forEach((element, index) => {
      if( element > mostVotes) {
        mostVotes = element
        setMostVoted(index)
      }
    })
  })

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <Button clickHandler={selectRandom} text="Next anecdote" />
      <Button clickHandler={Vote} text="Vote" />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVoted]}</p>
      <br></br>
      has {votes[mostVoted]} votes
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

const Button = ({ clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
