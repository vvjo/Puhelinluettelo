require("dotenv").config()
const express = require('express')
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const Person = require("./models/person")
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


app.use(express.static("build"))
app.use(cors())
app.use(bodyParser.json())

morgan.token('contentti', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contentti'))

const personSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    number: { type: Number, required: true, minlength: 6 }
});

personSchema.plugin(uniqueValidator)

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persones => {
        res.json(persones.map(person => person.toJSON()))
    });
});

app.get('/api/info', (req, res) => {
    Person.countDocuments({}, (err, count) => {
        res.send(`<p>Phonebook has info for ${count} people</p><br><p>${new Date()}</p>`)
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).then(pers => {
        if (pers) {
            res.json(pers.toJSON())
        } else {
            res.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body
    console.log(req.params)
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updated => {
            res.json(updated.toJSON())
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(resu => {
        res.status(204).end()
    })
        .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
    const bod = req.body

    if (bod.name === "" || bod.number === null) {
        return res.status(400).json({ error: "name or number missing" })
    }

    const person = new Person({
        name: bod.name,
        number: bod.number,
    })

    person.save()
        .then(saved => saved.toJSON())
        .then(savedFormatted => response.json(savedFormatted))
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})