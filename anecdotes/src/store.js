import anecdoteService from './services/anecdotes'
import { create } from 'zustand'



const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  
  actions: {
    addVote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updatedAnecdote = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(n => n.id === id ? updatedAnecdote : n)
      }))
    },
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
  },
    removeAnecdote: async (id) => {
      await anecdoteService.deleteAnecdote(id)

      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    }
  },

}))


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  return filteredAnecdotes

}

// export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore
