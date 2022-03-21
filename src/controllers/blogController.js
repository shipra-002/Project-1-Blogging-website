const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const isValid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null' || typeof (value) == 0) {
        return false
    }
    //    if(typeof (value) == 0 ){
    //        return false
    //    }
    if (typeof (value) == 'String' || 'Array' && value.length > 0) {
        return true
    }
}
const createBlog = async function (req, res) {
    try {
        let data = req.body

        let isPublished = req.body.isPublished

        const { title, body, authorId, tags, category, subcategory } = data
        //  if (typeof (data) !== undefined || typeof (data) !== null || data.length !== 0)
        if (Object.keys(data) == 0) { return res.status(400).send("data is missing") }
        const req0 = isValid(title)
        if (!req0) return res.status(400).send("title is required")

        const req1 = isValid(body)
        if (!req1) return res.status(400).send("body is required")

        const req2 = isValid(authorId)
        if (!req2) return res.status(400).send("authorId is required")

        const req3 = isValid(tags)
        if (!req3) return res.status(400).send("tags is required")

        const req4 = isValid(category)
        if (!req4) return res.status(400).send("category is required")

        const req5 = isValid(subcategory)
        if (!req5) return res.status(400).send("subCategory is required")
        if (isPublished === true) {
            data["publishedAt"] = new Date()
        }
        const idData = await authorModel.findById(authorId)
        if (!idData)
         return   res.status(404).send({ status: false, msg: "Author id is Invalid" })
        const savedData = await blogModel.create(data)
      return  res.status(201).send({ status: true, msg: savedData })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

const getBlog = async function (req, res) {
    try {
        const data = req.query
        const blogs = await blogModel.find(data).find({ isPublished: true, isDeleted: false }).populate("authorId").count()
        // const blogs = await blogModel.find({data, isPublished: true, deleted: false }).populate("authorid")
        const blog1 = await blogModel.find(data).find({ isPublished: true, isDeleted: false }).populate("authorId")
        if (blog1.length == 0) {
            return res.status(404).send({ status: false, msg: "No blogs Available." })
        }
      return  res.status(200).send({ status: true, data: blog1, count: blogs });
    }
    catch (error) {
    return    res.status(500).send({ status: false, msg: error.message });
    }
}

const updateBlog = async function (req, res) {
    try {
        let blogid = req.params.blogId
        let check = await blogModel.findById(blogid)
        if (!check) return res.send('not valid id')

        let checking = check.isDeleted
        if (checking == true) return res.status(404).send({ status: false, msg: "blog has been already deleted" })
        let update = await blogModel.findOneAndUpdate({ _id: blogid }, { isPublished: true }, { new: true })

        let id = update.isPublished

        if (id == true) {
            req.body["publishedAt"] = new Date()
        }
        let updateBody = req.body
        let updated = await blogModel.findOneAndUpdate({ _id: blogid }, updateBody, { new: true })
       return res.status(200).send({ msg: updated });

    } catch (err) {
        return res.status(500).send({ msg: err.mesage })
    }
}



const deleteId = async function (req, res) {
    try {
        let id = req.params.blogId
        let data = await blogModel.findById(id)
        if (data) {
            if (data.isDeleted == false) {
                let Data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deleteAt: new Date() }, { new: true })
                return res.status(200).send({ status: true, msg: "data deleted" })

            }
            else {
                return res.status(200).send({ msg: "data already deleted" })
            }

        } else {
            return res.status(404).send({ msg: "id does not exist" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.massage })
    }
}

const deletedBlogs = async function (req, res) {

    try {
        let data = req.query
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "not a vaild input" })

        let check = await blogModel.find(data)
        if (!check) return res.status(404).send('Blog not exist')
        console.log(check)

        // let checking = check.isPublished
        // if(checking == false) {

        const deleteBYquery = await blogModel.updateMany({ $and: [data, { isDeleted: false }, { isPublished: false }] }, { $set: { isDeleted: true, deleteAt: new Date() } })
        if (deleteBYquery.modifiedCount == 0) return res.status(400).send('user already deleted')

        if (!deleteBYquery) return res.status(404).send({ status: false, msg: "blog not exist" })
       return res.status(200).send({ status: true, msg: deleteBYquery })
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.mess })
    }
}


module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteId = deleteId;
module.exports.deletedBlogs = deletedBlogs;
 
      




