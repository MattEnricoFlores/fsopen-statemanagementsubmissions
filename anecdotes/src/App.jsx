import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

import { useAnecdoteActions } from "./store"
import { useEffect } from "react"

const App = () => {

  const { initialize } = useAnecdoteActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
     <Notification />

     <Filter />
     <AnecdoteList />
     <AnecdoteForm />
    </div>
  )
}

export default App
