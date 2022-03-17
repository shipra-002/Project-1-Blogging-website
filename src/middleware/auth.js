const jwt = require("jsonwebtoken");

const authenticate= function(req,res,next){
    try {
    let token = req.headers["x-auth-token"];
    if(!token) 
    return res.status(404).send({status:false, mssg:"token must be present"});
    
    let decodedtoken= jwt.verify(token,"fzs");
    if(!decodedtoken)
     return res.status(400).send({status:false,mssg:"invalid token"})
   
     req.authorId = decodedtoken.authorId 

    next()
    }
    catch(err) {
        res.status(500).send({status: false, error: err.message})
    }
}


const authorize = function(req,res,next) { 
    try {
    let authortobemodified = req.params.authorid

    let token = req.headers["x-auth-token"];
    if(!token){
    return res.status(404).send({status:false, mssg:"token must be present"});
    }
    let decodedtoken= jwt.verify(token,"fzs");
    if(!decodedtoken) 
    {
        return res.status(401).send({status:false,mssg:"invalid token"})
    }
    let authorloggedin = decodedtoken.authorid

    if(authortobemodified!= authorloggedin ){
     return res.send({status:false, msg:"loggedin person is not allow to access the request"})
    }
    next()
    }
    catch(err) {
        res.status(500).send({status: false, error: err.message})
    }
}

module.exports.authenticate = authenticate
module.exports.authorize = authorize