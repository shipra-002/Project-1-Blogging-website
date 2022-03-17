const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')

// 1.
const createBlog = async function (req, res) {
try {
    let blog = req.body;
    if(!blog) {
        res.status(404).send({status: false, msg: 'blog data required'})
    }
    else {

        let blogCreated = await blogModel.create(blog)
        res.status(201).send( { status: true, msg : blogCreated})
        }
    }
    catch(err) {     
        res.status(500).send({error: 'Invalid Author Id'})
    }
}


// 2.
const updateBlog = async function (req, res) {
    try {
        let  blogId = req.params.blogId;
      const id = await blogModel.findById(blogId)
  
      if (!id) {
        return res.status(401).send({ msg: "Invalid Id" });
      }
      let data = await blogModel.findOneAndUpdate({ _id: req.params.blogId }, { title: req.body.title, body: req.body.body, tags: req.body.tags, subCategory: req.body.subCategory, PublishedAt: Date(), isPublished: true }, { new: true })
      res.status(200).send({ status: true, data: data });
    }
    catch (error) {
      res.status(500).send({ status: false, msg: error.message })
    }
}



// 3.
const getBlogs  = async function (req, res) {
    try {
        let array = []
        let authorId = req.query.authorId
        let tags = req.query.tags
        let category = req.query.category
        let subCategory = req.query.subCategory
        let blog = await blogModel.find({ $or : [{ authorId: authorId}, {category: category}, { tags: tags}, { subCategory: subCategory}]})
        if (blog.length > 0) {
            for (let element of blog) {
                if (element.isDeleted === false && element.isPublished === true) {
                    array.push(element)
                }
            }
            res.status(200).send({ status: true, data: array})
        }
    }
    catch(error) {
        res.status(500).send({status: false, msg: 'no such data found'})
    }
}


// 4.
const DeletedId = async function(req,res){

 
    try{
        let id = req.params.blogId
        let data = await blogModel.findById(id)
        if(data){
            if(data.isDeleted===false){
            let Data2 = await blogModel.findOneAndUpdate({_id:id},{isDeleted:true, deletedAt:new Date()}, {new:true})
         return   res.status(200).send({status:true, msg:"data deleted"})

            }
            else{
             return   res.status(200).send({msg:"data already deleted"})
            }

        } else{
          return  res.status(401).send({ msg:"id does not exist"})
        }
         }
         catch(err){
             res.status(500).send({status:false, msg:err.massage})
         }
}


// 5.
const deletedBlogs= async function(req,res){
    try {
    let author_Id=req.query.author_Id
    let category=req.query.category
    let tag=req.query.tag
    let subCategory=req.query.subCategory
    console.log(`query params are:${author_Id} ${category} ${tag} ${subCategory}`)
    if(!(author_Id || category || tag || subCategory)){
        res.status(401).send({status: false, msg: 'blog data required'})
    } else{

    let deleteBlogs= await blogModel.deleteOne({$or: [ { author_Id:author_Id},{category:category},{tag:tag},{subCategory:subCategory}]})

    res.status(200).send({status:true, msg:deleteBlogs})
}
    }catch(err) {
        res.status(500).send({status: false, output: err.mesage})
    }

    }

module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.getBlogs = getBlogs
module.exports.DeletedId = DeletedId
module.exports.deletedBlogs = deletedBlogs
 
      




