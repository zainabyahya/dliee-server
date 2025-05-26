const mongoose = require('mongoose')
const { Schema, model } = mongoose

const SectionSchema = new Schema({
    title: { type: String, required: true },
    html: { type: String, required: true }
})

const LibraryPostSchema = new Schema({
    title: { type: String, required: true },
    sections: { type: [SectionSchema], required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = model('LibraryPost', LibraryPostSchema)
