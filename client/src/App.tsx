import { BaseSyntheticEvent, useState } from 'react'
import './App.css'

function App() {
    const [name, setName] = useState('')

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

    return (
        <div className='App'>
            <form onSubmit={postName}>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />
                <button type='submit'>Send Name</button>
            </form>
        </div>
    )
}

export default App
