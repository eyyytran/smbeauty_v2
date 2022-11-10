import express from 'express'
import cors from 'cors'
import toDosRouters from './routes/todos'

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

app.get('/', cors(), async (req, res) => {
    res.send('Hello World')
})

app.get('/home', async (req, res) => {
    res.send({ message: 'This is the data for the home page' })
})

app.post('/post_name', async (req, res) => {
    let { name } = req.body
    console.log(name)
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))
