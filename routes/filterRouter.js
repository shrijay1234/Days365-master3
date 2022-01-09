const router = require('express').Router()


const filterController = require('../controllers/filterController')

//user details
router.get(
    '/',
    
    filterController.filter
)



module.exports = router
