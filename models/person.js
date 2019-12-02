const mongoose = require('mongoose')
mongoose.set("useUnifiedTopology", true)
mongoose.set("useFindAndModify", false)
const url = process.env.MONGODB_URI

console.log("Connecting to ", url)



mongoose.connect(url, { useNewUrlParser: true })
.then(resu => {
    console.log('connected to MongoDB')
})
.catch(er => {
    console.log('error connecting to mongo', er.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})
personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)