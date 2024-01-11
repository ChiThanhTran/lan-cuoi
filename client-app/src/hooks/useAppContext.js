
import { useContext } from 'react'

import { AppContext } from '../contexts/AppProvider'

export const useAppContext = (key) => {
  const { store, updateStore } = useContext(AppContext)
  return {
    data: store[key],
    setData: (data) => {
      updateStore(key, data)
    },
  }
}