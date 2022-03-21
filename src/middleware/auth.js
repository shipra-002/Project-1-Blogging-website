const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel")

const authenticate= function(req,res,next){
    try {
    let token = req.headers["x-auth-token"];
    if(!token) return res.status(404).send({status:false, msg:"token must be present"});
    
    let decodedtoken= jwt.verify(token,"appleShine");
    if(!decodedtoken) return res.status(400).send({status:false,msg:"invalid token"})
    req.authorId = decodedtoken.authorId 
    next()
    }
    catch(err) {
        res.status(500).send({status: false, error : err.message})
    }
}

const authorize = async function (req, res, next) {

    let blogId = req.params.blogId
    let findBlog = await blogModel.findById(blogId)
    if(!findBlog) return res.status(400).send({msg : "Blog Id is not valid"})
    let authortobemodified = findBlog.authorId 
    if(!authortobemodified) return res.status(400).send({msg : "Author Id is not valid"})
    let token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedtoken = jwt.verify(token, "appleShine");
    if (!decodedtoken) return res.send({ status: false, msg: "invalid token" })
    let userloggedin = decodedtoken.authorId

    if (authortobemodified != userloggedin) return res.send({ status: false, msg: "user is not allowed to modify other's blog" })

    next()
}


module.exports.authenticate = authenticate
module.exports.authorize = authorize