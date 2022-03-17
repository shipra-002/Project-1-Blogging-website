const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const middleware= require('../middleware/auth')


router.post('/createAuthor', authorController.createAuthor)

router.post('/createBlog',middleware.authenticate, blogController.createBlog)

router.put('/updateBlog/:blogId',middleware.authenticate,middleware.authorize, blogController.updateBlog)

router.get('/getBlogs',middleware.authenticate, blogController.getBlogs)

router.delete('/DeleteId/:blogId',middleware.authenticate,middleware.authorize, blogController.DeletedId)

router.delete('/deletedBlogs',middleware.authenticate,blogController.deletedBlogs)
router.post('/loginAuthor', authorController.loginAuthor)

module.exports = router