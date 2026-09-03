import { create } from 'zustand'

const useCounterStore = create(set => ({
  goodCount: 0,
  neutralCount: 0,
  badCount: 0,
  actions: {
    addGood: () => set(state => ({ goodCount: state.goodCount + 1 })),
    addNeutral: () => set(state => ({ neutralCount: state.neutralCount + 1 })),
    addBad: () => set(state => ({ badCount: state.badCount + 1 })),
  }  
}))

const totalCount = state => state.goodCount + state.neutralCount + state.badCount

// the hook functions that are used elsewhere in app
export const useCounterGood = () => useCounterStore(state => state.goodCount)
export const useCounterNeutral = () => useCounterStore(state => state.neutralCount)
export const useCounterBad = () => useCounterStore(state => state.badCount)

export const useCounterTotal = () => useCounterStore(totalCount)
export const useCounterAverage = () => useCounterStore(state => 
    {const total = totalCount(state)
        if (total === 0) return 0
        return (state.goodCount - state.badCount) / total
})
export const useCounterPercentage = () => useCounterStore(state => 
    {const total = totalCount(state)
        if (total === 0) return 0
        return (state.goodCount /total) * 100
})


export const useCounterControls = () => useCounterStore(state => state.actions)