const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')

// 1.
const createBlog = async function (req, res) {
try {
    let blog = req.body;
    let authorId = blog.authorId;
    if(!blog) {
        res.status(404).send({status: false, msg: 'blog data required'})
    }
    else {
        let author = await authorModel.findById({_id: authorId})
        if(!authorId) {
        res.status(404).send({status: false, msq: `please provide valid Id ${author}`}) 
        }
        else {
        let blogCreated = await blogModel.create(blog)
        res.status(201).send( { status: true, msg : blogCreated})
        }
    }
}
    catch(err) {
        res.status(500).send({error: err.message})
    }
}




// 2.
const updateBlog = async function (req, res) {
    try {
        let  blogId = req.params.blogId;
      const id = await blogModel.findById(blogId)
  
      if (!id) {
        return res.status(404).send({ msg: "data not found" });
      }
      let data = await blogModel.findOneAndUpdate({ _id: req.params.blogId }, { title: req.body.title, body: req.body.body, tags: req.body.tags, subCategory: req.body.subCategory, PublishedAt: Date(), isPublished: true }, { new: true })
      res.status(200).send({ msg: "successfully updated", data: data });
    }
    catch (error) {
      res.status(500).send({ status: false, msg: "error-response-status" })
    }
}


// 3.
const getBlogs = async function(req,res){
    try{
        let authorId = req.query.authorId
        let category = req.query.category

        if(!authorId){
            res.status(400).send({status:false,msg:"authorId is required"})
        }
        if(!category){
            res.status(400).send({status:false,msg:"category is required"}) 
        }
        let authorDetails=await authorModel.find({authorId:authorId})
        if(!authorDetails){
            res.status(404).send({status:false,msg:"invalid author ID"})
        }
        let blogDetails=await blogModel.find({authorId:authorId,category:category,isDeleted:false,idPublished:true})
        if(!blogDetails){
            res.status(404).send({status:false,msg:"no blogs found"})
        }
        else{
            res.status(200).send({status:true,data:blogDetails})
        }
    }catch (error){
        res.status(500).send({msg:error.mesage})
    }
}


// 4.
const deleteBlog = async function(req,res){

    try{  
        let blogsId = req.params.blogId;
        let present = await blogModel.findOneAndUpdate({$and:[{_id:blogsId},{isDeleted:false}],$set:{isDeleted:true},new:true})
        res.status(200).send({status: true,out: present})

    }
    catch(err){
        res.send({status:false,data:err.message})
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
        res.status(404).send({status: false, msg: 'blog data required'})
    } else{

let newBlogs= await blogModel.deleteOne({$or: [ { author_Id:author_Id},{category:category},{tag:tag},{subCategory:subCategory}]})

res.status(200).send({status:true,msg:newBlogs})
}
    }catch(err) {
        res.status(500).send({status: false, output: err.mesage})
    }

    }

module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.filterBlog = getBlogs
module.exports.deleteBlog = deleteBlog
module.exports.deletedBlogs = deletedBlogs

