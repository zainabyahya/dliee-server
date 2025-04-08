const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const topicSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String },
        resource: {
            type: Schema.Types.ObjectId,
            ref: 'Resource',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = model('Topic', topicSchema);