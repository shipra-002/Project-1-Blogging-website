const authorModel =  require('../models/authorModel')


const createAuthor = async function (req, res) {
    try {
        
    let data = req.body;
    if(data) {
    let autherCreated = await authorModel.create(data)
    res.status(201).send({ status: true, msg: autherCreated})
    }
    else {
        res.send('please provide valid eamil')
    }
    }
    catch(err) {
        res.status(500).send({ error: err.message})
    }
}


module.exports.createAuthor = createAuthor