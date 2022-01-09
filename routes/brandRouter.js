const router = require('express').Router();
const { body, query, check } = require('express-validator');
const { verifyAccessJwt, verifyAdmin, verifyVendor } = require('../middleware');
const { publicFileUpload } = require('../utils/fileUpload');
const brandController = require('../controllers/brandController');


const productBodyValidator = [
    body('brandName').trim().notEmpty(),
    body('registrationNo').trim().notEmpty(),
    body('brandWebsite').trim().notEmpty(),
    body('categoryId').trim().notEmpty()
];
  

router.post('/register',verifyAccessJwt,verifyVendor, productBodyValidator, publicFileUpload.single('image'), brandController.addBrand);

//router for admin to get all pending verificattion brands
router.post('/getBrands',verifyAccessJwt, brandController.getBrands)


//router for vendor to get all brands
router.post('/vendor/all',verifyAccessJwt, brandController.getBrandsvendor)

//router to change status Pending to Approved
router.put('/updateStatus',verifyAccessJwt, brandController.changeStatus)

module.exports = router;



