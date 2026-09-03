import { useAnecdotes, useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteList = () => {

    const anecdotes = useAnecdotes()
    const {addVote, removeAnecdote} = useAnecdoteActions()
    const {setNotification} = useNotificationActions()

    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

    const vote = async (anecdote) => {
      await addVote(anecdote.id)
      setNotification(`you voted '${anecdote.content}'`)
    }

    return (
    <div>
        <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>Vote</button>
            
            {anecdote.votes === 0 && (
              <button onClick={() => removeAnecdote(anecdote.id)}>Delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
    )
}

export default AnecdoteList