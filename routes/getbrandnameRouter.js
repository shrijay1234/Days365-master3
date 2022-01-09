const router = require('express').Router()
const  brandnameController = require('../controllers/brandnameController.js')

router.get(
    '/getbrandname',
  brandnameController.getbrandname
)


module.exports = router