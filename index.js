const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
var morgan = require("morgan")

app.use(express.static("build"))
app.use(cors())
app.use(bodyParser.json())
morgan.token('contentti', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contentti'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "backend",
        "number": "123",
        "id": 5
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><br><p>${new Date()}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
    
})

app.delete("/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(pers => pers.id !== id)

    res.status(204).end()
    
})

const generateId = () => {
    return Math.floor(Math.random()*100)
}

app.post("/persons", (req, res) => {
    const bod = req.body
    
    if(!bod.name || !bod.number){
        return res.status(400).json({error: "name or number missing"})
    }

    if(persons.some(pers => pers.name === bod.name)){
        return res.status(400).json({error: "name is already added"})
    }

    const person = {
        name: bod.name,
        number: bod.number,
        id: generateId()
    }
    persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})