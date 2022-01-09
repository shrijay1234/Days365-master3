const router = require('express').Router()
const cartController = require('../controllers/cartController')
const {
    verifyAccessJwt,
    verifyAdmin,
    verifyUser,
    verifyVendor,
} = require('../middleware')

router.post(
    '/create-cart',
    verifyAccessJwt,
    verifyUser,
    cartController.createCart
)

router.post(
    '/delete-cart',
    verifyAccessJwt,
    verifyUser,
    cartController.deleteCartData
)

router.post(
    '/convert-cart',
    verifyAccessJwt,
    verifyUser,
    cartController.converttocart
)
router.post(
    '/get-cart',
    verifyAccessJwt,
    verifyUser,
    cartController.getCartData
)
router.post(
    '/clear-cart',
    verifyAccessJwt,
    verifyUser,
    cartController.clearCartData
)

module.exports = router
