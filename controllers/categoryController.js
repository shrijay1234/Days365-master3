const { validationResult } = require('express-validator')
const { ErrorBody } = require('../utils/ErrorBody')
const categoryService = require('../services/categoryService')
const mongoose = require('mongoose')
const _ = require('underscore')
const vendorDetailsService = require('../services/vendorDetailsService')

/**
 *  Add root category
 */

exports.addRootCategory = async (req, res, next) => {
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new ErrorBody(400, 'Bad Inputs', errors.array()))
        } else {
            let reqBody = {
                category_name: 'Departments',
                is_leaf: false,
            }
            await categoryService.createCategory(reqBody)
            var response = {
                message: 'Root successfully created.',
                error: false,
                data: {},
            }
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        }
    } catch (error) {
        next({})
    }
}

/**
 *  Add a new category
 */

exports.addCategory = async (req, res, next) => {
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new ErrorBody(400, 'Bad Inputs', errors.array()))
        } else {
            let imageLocation = req.file ? req.file.location : null
            let categoryName = req.body.categoryName
            let parentId = req.body.parentId
            let isRestricted = req.body.isRestricted
            let isLeaf = req.body.isLeaf
            var parentCategory
            let reqBody = {
                category_name: categoryName,
                is_restricted: isRestricted,
                is_leaf: isLeaf,
            }
            if (imageLocation) {
                reqBody['image_URL'] = imageLocation
            }
            if (
                await categoryService.getCategoryWithFilters(
                    {
                        category_name: categoryName,
                    },
                    null,
                    {
                        collation: {
                            locale: 'en',
                            strength: 2,
                        },
                    }
                )
            ) {
                let response = {
                    message: 'Category already exists.',
                    error: true,
                    data: {},
                }
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                return res.json(response)
            }
            if (parentId) {
                let id = mongoose.Types.ObjectId(parentId)
                parentCategory = await categoryService.getCategory(id)
                if (!parentCategory || parentCategory.is_leaf) {
                    return next(new ErrorBody(400, 'Bad Inputs', []))
                }
            } else {
                let filters = {
                    category_name: 'Departments',
                }
                parentCategory = await categoryService.getCategoryWithFilters(
                    filters
                )
                if (!parentCategory) {
                    return next({})
                }
            }
            reqBody['parent'] = parentCategory
            const result = await categoryService.createCategory(reqBody)
            if (parentId) {
                try {
                    let id = mongoose.Types.ObjectId(parentId)
                    let updateQuery = {
                        is_leaf: false,
                    }
                    await categoryService.updateCategory(id, updateQuery)
                } catch (error) {
                    await categoryService.deleteCategory(result._id)
                    return next({})
                }
            }
            var response = {
                message: 'Category successfully created.',
                error: false,
                data: {},
            }
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        }
    } catch (error) {
        console.log(error)
        next({})
    }
}

/**
 * Get top level categories categories
 */

exports.getMainCategories = async (req, res, next) => {
    try {
        let filters = {
            category_name: 'Departments',
        }
        const root = await categoryService.getCategoryWithFilters(filters)
        if (!root) {
            return next({})
        }
        let projection = {
            _id: 1,
            category_name: 1,
            is_leaf: 1,
            is_restricted: 1,
            image_URL: 1,
            createdAt: 1,
        }
        let options = {
            lean: true,
        }
        const result = await root.getImmediateChildren({}, projection, options)
        var response = {
            message: 'Successfully retrieved root categories.',
            error: false,
            data: {
                categories: result,
            },
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(response)
    } catch (error) {
        next({})
    }
}

/**
 * Get all categories
 */

exports.getCategories = async (req, res, next) => {
    try {
        let filters = {}
        let options = {
            lean: true,
        }
        const result = await categoryService.getCategories(
            filters,
            null,
            options
        )
        var response = {
            message: 'Successfully retrieved categories.',
            error: false,
            data: {
                categories: result,
            },
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(response)
    } catch (error) {
        next({})
    }
}

/**
 *  Get a category record
 */

exports.getCategory = async (req, res, next) => {
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new ErrorBody(400, 'Bad Inputs', errors.array()))
        } else {
            let id = mongoose.Types.ObjectId(req.query.id)
            let projection = {
                _id: 1,
                category_name: 1,
                is_leaf: 1,
                parent: 1,
                is_restricted: 1,
                image_URL: 1,
                createdAt: 1,
            }
            let options = {
                lean: true,
            }
            const result = await categoryService.getCategory(
                id,
                projection,
                options
            )
            var response = {
                message: 'No record found.',
                error: true,
                data: {},
            }
            if (result) {
                response = {
                    message: 'Successfully retrieved category.',
                    error: false,
                    data: {
                        category: result,
                    },
                }
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        }
    } catch (error) {
        next({})
    }
}

/**
 * Get sub categories
 */

exports.getSubCategories = async (req, res, next) => {
    try {
        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(new ErrorBody(400, 'Bad Inputs', errors.array()))
        } else {
            var parentCategory
            var id = req.query.id
            if (id) {
                
                let parentId = mongoose.Types.ObjectId(req.query.id)
                parentCategory = await categoryService.getCategory(parentId)
                if (!parentCategory) {
                    return next(new ErrorBody(400, 'Bad Inputs', []))
                }
            } else {

                let filters = {
                    category_name: 'Departments',
                }
                parentCategory = await categoryService.getCategoryWithFilters(
                    filters
                )
                if (!parentCategory) {
                    return next({})
                }

                // let projection = {
                //     _id: 1,
                //     category_name: 1,
                //     is_leaf: 1,
                //     is_restricted: 1,
                //     image_URL: 1,
                //     createdAt: 1,
                // }
                // let options = {
                //     lean: true,
                // }
                // const result = await parentCategory.getImmediateChildren(
                //     {},
                //     projection,
                //     options
                // )
                // let payload = {
                //     parent: {
                //         id: parentCategory._id,
                //         name: parentCategory.category_name
                //     },
                //     categories: result
                // }

            //     var allcategorywithsubcategory = result

            //    const getsubcategoryfunction  = async (category) =>{
            //         let projection = {
            //             _id: 1,
            //             category_name: 1,
            //             is_leaf: 1,
            //             is_restricted: 1,
            //             image_URL: 1,
            //             createdAt: 1,
            //         }
            //         let options = {
            //             lean: true,
            //         }
            //         return await category.getImmediateChildren(
            //             {},
            //             projection,
            //             options
            //         )
            //     }
            //     function callcheck(check) {
                  
            //         for (i = 0; i < check.length; i++) {
            //             ckeck[i].subcategory = getsubcategoryfunction(ckeck[i])

            //             if (ckeck[i].subcategory.length !=0) {
            //                 callcheck(ckeck[i].subcategory)
            //             }
            //         }

            //         allcategorywithsubcategory[i].subcategory = check
            //     }

            //     callcheck(result)
            }
            let projection = {
                _id: 1,
                category_name: 1,
                is_leaf: 1,
                is_restricted: 1,
                image_URL: 1,
                createdAt: 1
            }
            let options = {
                lean: true
            }
            const result = await parentCategory.getImmediateChildren({}, projection, options);
            let payload = {
                parent: {
                    id: parentCategory._id,
                    name: parentCategory.category_name,
                },
                categories: result,
            }
            var response = {
                message: 'Successfully retrieved sub categories.',
                error: false,
                data: payload,
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        }
    } catch (error) {
        next({})
    }
}

/**
 * Search for a Category By Name.
 * @createdBy : VINAY SINGH BAGHEL
 * @createdOn : 04/06/2021
 * @usedIn : Seller Dashboard
 * @apiType : PoST
 * @lastModified : 04/06/2021
 * @modifiedBy : VINAY SINGH BAGHEL
 * @parameters : CategoryName
 * @version : 1
 */

exports.getCategoriesByName = async (req, res, next) => {
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new ErrorBody(400, 'Bad Inputs', errors.array()))
        } else {
            const record = await vendorDetailsService.getVendorDetailsRecord(
                { vendor_id: req.user.id },
                null,
                { lean: true }
            )
            var parentCategory
            var parentCategoryArr = []
            if (req.body.CategoryName) {
                let regexName = new RegExp(req.body.CategoryName, 'i')
                let filters = {
                    category_name: regexName,
                }

                parentCategory = await categoryService.getCategoryWithFilters(
                    filters
                )
                if (!parentCategory) {
                    return next(new ErrorBody(400, 'Bad Inputs', []))
                }

                console.log(parentCategory)
                let projection = {
                    _id: 1,
                    category_name: 1,
                    is_leaf: 1,
                    is_restricted: 1,
                    image_URL: 1,
                    createdAt: 1,
                }
                let options = {
                    lean: true,
                }
                const result = await parentCategory.getAncestors(
                    {},
                    [projection],
                    [options]
                )

                if (
                    record &&
                    record.ProductCategoryId &&
                    record.ProductCategoryId.length
                ) {
                    result.map((perm, i) => {
                        record.ProductCategoryId.map((item, i) => {
                            if (perm._id == item) {
                                parentCategoryArr.push(parentCategory)
                                console.log('Matched', item)
                            }
                        })
                    })
                }

                if (parentCategoryArr && parentCategoryArr.length == 0) {
                    return res.status(201).json({
                        message: 'Category Not exists',
                        error: false,
                        data: [],
                    })
                } else {
                    return res.status(201).json({
                        message: 'Successfully Retrieved Category.',
                        error: false,
                        data: parentCategoryArr,
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        next({})
    }
}

/**
 * Browse All Category and subcategory.
 * @createdBy : VINAY SINGH BAGHEL
 * @createdOn : 04/06/2021
 * @usedIn : Seller Dashboard
 * @apiType : Get
 * @lastModified : 04/06/2021
 * @modifiedBy : VINAY SINGH BAGHEL
 * @parameters : id
 * @version : 1
 */

exports.getCategoriesBrowse = async (req, res, next) => {
    try {
        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(new ErrorBody(400, 'Bad Inputs', errors.array()))
        } else {
            //var parentCategory;
            var payload
            var id = req.query.id
            const record = await vendorDetailsService.getVendorDetailsRecord(
                { vendor_id: req.user.id },
                null,
                { lean: true }
            )
            if (id) {
                let parentId = mongoose.Types.ObjectId(req.query.id)
                let parentCategory1 = await categoryService.getCategory(
                    parentId
                )
                if (!parentCategory1) {
                    return next(new ErrorBody(400, 'Bad Inputs', []))
                }

                let projection = {
                    _id: 1,
                    category_name: 1,
                    is_leaf: 1,
                    is_restricted: 1,
                    image_URL: 1,
                    createdAt: 1,
                    image_URL: 1,
                }
                let options = {
                    lean: true,
                }
                let filterObj1 = {}
                if (id == '6087df08d80dde18cb1a4036') {
                    filterObj1 = { _id: { $in: record.ProductCategoryId } }
                }
                const result = await parentCategory1.getImmediateChildren(
                    filterObj1,
                    projection,
                    options
                )
                payload = {
                    parent: {
                        id: parentCategory1._id,
                        name: parentCategory1.category_name,
                    },
                    categories: result,
                }
            } else {
                let filters = {
                    category_name: 'Departments',
                }
                let parentCategory =
                    await categoryService.getCategoryWithFilters(filters)
                if (!parentCategory) {
                    return next({})
                }

                let projection = {
                    _id: 1,
                    category_name: 1,
                    is_leaf: 1,
                    is_restricted: 1,
                    image_URL: 1,
                    createdAt: 1,
                    image_URL: 1,
                }
                let options = {
                    lean: true,
                }
                // const record = await vendorDetailsService.getVendorDetailsRecord({ vendor_id: req.user.id }, null, { lean: true });
                let filterObj = {}
                if (record) {
                    filterObj = { _id: { $in: record.ProductCategoryId } }
                }
                const result = await parentCategory.getImmediateChildren(
                    filterObj,
                    projection,
                    options
                )
                payload = {
                    parent: {
                        id: parentCategory._id,
                        name: parentCategory.category_name,
                    },
                    categories: result,
                }
            }
            var response = {
                message: 'Successfully retrieved sub categories.',
                error: false,
                data: payload,
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(response)
        }
    } catch (error) {
        console.log(error)
        next({})
    }
}
