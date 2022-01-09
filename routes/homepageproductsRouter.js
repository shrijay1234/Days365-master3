const router = require('express').Router()

const {
    verifyAccessJwt,

    verifyUser,
} = require('../middleware')

const homepageproductsController = require('../controllers/homepageproductsController')

//user details
router.get(
    '/topfeaturedandotherfields',
    
    homepageproductsController.topfeaturedandotherfieldsproducts
)

//user update
router.get(
    '/latestproducts',
   
    homepageproductsController.latestproducts
)

router.get(
    '/categoryproduct',
   
    homepageproductsController.categoryproduct
)


module.exports = router
