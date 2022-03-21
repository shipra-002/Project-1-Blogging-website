const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");
// const validator = require("email-validator")

const isValid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null') {
        return false
    }
    if (typeof (value) == 0) {
        return false
    }
    if (typeof (value) == 'String' || 'Array' && value.length > 0) {
        return true
    }
}

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        const { fname, lname, title, email, password } = data

        const req0 = isValid(fname)
        if (!req0) return res.status(400).send('fname is required')

        const req1 = isValid(lname)
        if (!req1) return res.status(400).send('lname is required')

        const req2 = isValid(title)
        if (!req2) return res.status(400).send('title is required')

        const req3 = isValid(email)
        if (!req3) return res.status(400).send('email is required')

        const req4 = isValid(password)
        if (!req4) return res.status(400).send('password is required')

        let dataRes = await authorModel.create(data)
        return res.status(201).send({ msg: dataRes })
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

const login = async function (req, res) {
    try {
        if(Object.keys(req.body)==0) return res.status(400).send('Data is missing')
        const { email, password } = req.body
        const req7 = isValid(email)
        if (!req7) return res.status(400).send('email is required')

        const req8 = isValid(password)
        if (!req8) return res.status(400).send('password is required')

        let authorDetails = await authorModel.findOne({ email: email })
        let authorDetails1 = await authorModel.findOne({ password: password })

        if (authorDetails && authorDetails1) {
            const generatedToken = jwt.sign({ authorId: authorDetails._id, email: email }, "appleShine")

            return res.status(200).send({ status: true, token: generatedToken })
        } else {

            if (!authorDetails) {
                return res.status(400).send({ status: false, message: "Invalid Email" })
            }
            else if (!authorDetails1) {
                return res.status(400).send({ status: false, message: "invalid password" })
            }
        }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.login = login