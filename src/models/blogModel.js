const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema ( {
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: 'Author41',
        required: true
    },
    tags: ['String'],
    category: {
        type: String,
        required: true
    },
    subcategory: ['String'],
    deletedAt: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
        type: Date
    },
    isPublished: {
        type: Boolean,
        default: false
    },
}, { timestamps: true} )

module.exports = mongoose.model('Blog41', blogSchema)