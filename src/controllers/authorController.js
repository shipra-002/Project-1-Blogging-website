const authorModel =  require('../models/authorModel')
const jwt=require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        
    let data = req.body;

    if(!data) {
    return  res.send('please provide valid eamil')
  }
    let autherCreated = await authorModel.create(data);
    return  res.status(201).send({ status: true, msg: autherCreated})
    }
    catch(err) {
        res.status(500).send({ error: err.message})
    }
}

const loginAuthor = async function (req, res) {
try{
    email = req.body.email
    password = req.body.password

    let authorDetails = await authorModel.findOne({email: email, password: password, isDeleted: false})
    if(authorDetails) {
        const generatedToken = jwt.sign({ authorId: authorDetails._id, email:email}, "fzs")
    
      return  res.status(200).send({status: true, data: email._id, token: generatedToken})
    } else {
     return   res.status(401).send({status: false, message: 'Invalid credentials'})
    }
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}
module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor