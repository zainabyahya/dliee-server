const mongoose = require('mongoose')
const { Schema, model } = mongoose

const SectionSchema = new Schema({
    title: { type: String, required: true },
    html: { type: String, required: true },
    order: { type: Number, default: 0 }
})

const ModuleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ['video', 'pdf', 'article', 'other'],
        default: 'article'
    },
    url: {
        type: String
    },
    competency: {
        type: Schema.Types.ObjectId,
        ref: 'Competency',
        required: true
    },
    sections: {
        type: [SectionSchema],
        default: []
    }
}, {
    timestamps: true
})

module.exports = model('Module', ModuleSchema)
