import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import './App.css'

function App() {
    const [name, setName] = useState('')
    const [home, setHome] = useState('')

    const postName = async (e: BaseSyntheticEvent) => {
        e.preventDefault()
        try {
            await fetch('http://localhost:4000/post_name', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getHomeData() {
            try {
                const res = await fetch('http://localhost:4000/home', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res.json()
                setHome(data.message)
            } catch (error) {
                console.log(error)
            }
        }
        getHomeData()
    }, [])

    return (
        <div className='App'>
            <h1>{home}</h1>
            <form onSubmit={postName}>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />
                <button type='submit'>Send Name</button>
            </form>
        </div>
    )
}

export default App
