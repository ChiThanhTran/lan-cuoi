import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children, initialValues }) => {
    const [state, setState] = useState({ ...initialValues })
    const value = {
        store: state,
        updateStore: (key, payload) => {
            setState((prevState) => {
                return {
                    ...prevState,
                    [key]: payload
                }
            })
        },
    }
    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}