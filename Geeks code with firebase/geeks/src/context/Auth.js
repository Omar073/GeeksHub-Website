import { auth } from "../config/firebase"
import React, { useEffect , useState} from "react"
import { createContext } from "react"

export const  AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect (() => {
        const unsbscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            setUser(user)
            setloading(false)
        })

        return unsbscribe
    } 
    , [])

    

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>

    )

  
}
