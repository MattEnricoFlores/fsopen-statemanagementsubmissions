import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act, render, screen, cleanup } from '@testing-library/react'
import React from 'react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
    it('initialize loads anecdotes from service', async () => {
  const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

  const { result } = renderHook(() => useAnecdoteActions())

  await act(async () => {
    await result.current.initialize()
  })

  const { result: anecdotesResult } = renderHook(() => useAnecdotes())
  expect(anecdotesResult.current).toEqual(mockAnecdotes)
})
})

describe('anecdoteList', () => {
    const mockAnecdotes = [
        { id: 1, content: 'Test', votes: 2 },
        { id: 2, content: 'Another Test', votes: 0 },
        { id: 3, content: 'Yet Another Test', votes: 3 }
    ]

    beforeEach(() => {
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })
    })

    afterEach(() => {
        cleanup()
    })

    it('displayes all anecdotes sorted by votes', () => {
        render(React.createElement(AnecdoteList))
        const anecdotes = screen.getAllByText(/Test/)

        expect(anecdotes[0].textContent).toBe('Yet Another Test')
        expect(anecdotes[1].textContent).toBe('Test')
        expect(anecdotes[2].textContent).toBe('Another Test')
    }),

    it('filters list of anecdotes based on filter state', () => {
        
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 'Another' })
        render(React.createElement(AnecdoteList))
        
        expect(screen.getByText('Another Test')).toBeTruthy()
        expect(screen.getByText('Yet Another Test')).toBeTruthy()
        expect(screen.queryByText('Test')).not.toBeTruthy()
    })
})

describe('vote button', () => {
    const mockAnecdote = { id: 1, content: 'Test', votes: 2 }
    

    beforeEach(() => {useAnecdoteStore.setState({ anecdotes: [mockAnecdote], filter: '' })})

    it('vote button adds a vote to the anecdote', async () => {
        
        anecdoteService.update.mockResolvedValue({ ...mockAnecdote, votes: mockAnecdote.votes + 1 })

        render(React.createElement(AnecdoteList))
        
        const button = screen.getByRole('button', { name: 'Vote' })

        await act(async () => {
            button.click()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current[0].votes).toBe(3)
    })

})