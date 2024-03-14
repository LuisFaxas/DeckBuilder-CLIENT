import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../services/BACKEND_URL.JS'

const CardContext = createContext()

const CardProvider = ({ children }) => {

    const [ cards, setCards ] = useState([])
    const [ decks, setDecks ] = useState([])

    const getDecks = () => {
        axios.get(BACKEND_URL + '/decks')
        .then((response) => {
            setDecks(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        axios.get(BACKEND_URL + '/cards')
            .then((response) => {
                setCards(response.data)
                getDecks()

            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (
        <CardContext.Provider value={{ cards, setCards, decks, setDecks, getDecks }} >
                {children}
        </CardContext.Provider>
    )
}

export { CardContext, CardProvider }