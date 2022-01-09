const router = require('express').Router()
const { body } = require('express-validator')
const {
    verifyAccessJwt,

    verifyUser,
} = require('../middleware')

const userController = require('../controllers/userController')

//user details
router.get(
    '/userdetails',
    verifyAccessJwt,
    verifyUser,
    userController.userdetails
)

//user update
router.post(
    '/userupdate',
    verifyAccessJwt,
    verifyUser,
    userController.userupdate
)

module.exports = router
