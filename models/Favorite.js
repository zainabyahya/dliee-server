const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    posts: [{ type: Schema.Types.ObjectId, ref: 'CommunityPost' }]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Bookmark;
