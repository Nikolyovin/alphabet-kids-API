import mongoose from "mongoose"

const Letter = new mongoose.Schema({
    name: {type: String, required: true},
    voice: {type: String, required: true},
    images: {type: String, required: true},
    words: {type: String, required: true},
})

export default mongoose.model('Letter', Letter)