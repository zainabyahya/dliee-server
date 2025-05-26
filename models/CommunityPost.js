const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})
const CommunityPostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['question', 'post'], required: true },
    title: { type: String, required: true },
    html: { type: String, required: true },
    comments: { type: [CommentSchema], default: [] },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});


module.exports = model('CommunityPost', CommunityPostSchema)
