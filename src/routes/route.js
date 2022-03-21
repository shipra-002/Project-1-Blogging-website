const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const middleware= require('../middleware/auth')


router.post('/createAuthor', authorController.createAuthor)

router.post('/createBlog',middleware.authenticate,blogController.createBlog)

router.put('/updateBlog/:blogId',middleware.authenticate,middleware.authorize, blogController.updateBlog)

router.get('/getBlog',middleware.authenticate, blogController.getBlog)

router.delete('/deleteId/:blogId',middleware.authenticate,middleware.authorize, blogController.deleteId)

router.delete('/deletedBlogs',middleware.authenticate,blogController.deletedBlogs)
router.post('/login', authorController.login)

module.exports = router