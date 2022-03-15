const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')


router.post('/createAuthor', authorController.createAuthor)

router.post('/createBlog', blogController.createBlog)

router.put('/updateBlog/:blogId', blogController.updateBlog)

router.get('/getBlogs', blogController.filterBlog)

router.delete('/deleteBlog/:blogId', blogController.deleteBlog)

router.delete('/deletedBlogs', blogController.deletedBlogs)

module.exports = router