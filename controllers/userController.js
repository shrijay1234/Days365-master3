const userService = require('../services/userService')
const mongoose = require('mongoose')

exports.userupdate = async (req, res, next) => {
    try {
        const customerID = mongoose.Types.ObjectId(req.user.id)
        var condition = {
            _id: customerID,
        }

        var userdetails = await userService.getUserDetails(condition)

        reqBody = {
            fullname: req.body.fullname
                ? req.body.fullname
                : userdetails.fullname,
            email: req.body.email ? req.body.email : userdetails.email,
            mobile_number: {
                number: req.body.number ? req.body.number : userdetails.mobile_number.number,
                country_code: '+91',
            },
        }

     


        var updateuserdetails = await userService.updateUserDetails(condition,reqBody)


        var userdetails = await userService.getUserDetails(condition)
      
        if (!updateuserdetails) {
            response = {
                message: 'faild to update user details',
                error: true,
            }

            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        } else {
            response = {
                message: 'Successfully updated user details',
                error: false,
                data: userdetails,
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        }
    } catch (error) {
        next({})
    }
}

exports.userdetails = async (req, res, next) => {
    const customerID = mongoose.Types.ObjectId(req.user.id)
    var condition = {
        _id: customerID,
    }

    var userdetails = await userService.getUserDetails(condition)

    if (!userdetails) {
        response = {
            message: 'faild to retrive user details',
            error: true,
        }

        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.json(response)
    } else {
        response = {
            message: 'Successfully retrieved user details',
            error: false,
            data: userdetails,
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(response)
    }
}
