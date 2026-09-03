import { useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()


    const add = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await addAnecdote(content)
    setNotification(`You added '${content}'`)
    e.target.reset()
  }

    return (
        <div>
        <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm