const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://vaino:${password}@cluster0-7kftd.mongodb.net/person-app?retryWrites=true&w=majority`
mongoose.set("useUnifiedTopology", true)
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)
if (name === undefined) {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(pers => {
            console.log(`${pers.name} ${pers.number}`)
        })
        mongoose.connection.close()
    })
} else {

    const person = new Person({
        "name": name,
        "number": number,
    })

    person.save().then(response => {
        console.log(`added ${name} number ${number} to phone book`);
        mongoose.connection.close();
    })
}