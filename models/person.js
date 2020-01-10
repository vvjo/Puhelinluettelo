const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

const personSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3 },
    number: { type: String, required: true, minlength: 8 }
})

personSchema.plugin(uniqueValidator)

console.log('Connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(er => {
        console.log('error connecting to mongo', er.message)
    })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)