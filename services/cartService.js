const { cartModel } = require('../models/cartModel')
const { productModel } = require('../models/productModel')
/**
 * Create cart
 */
exports.createCart = async (reqBody = {}) => {
    return await cartModel.create(reqBody)
}

/**
 *  get the cart data
 */
exports.getCart = async (filters = {}, projection = null, options = {}) => {
    return await cartModel.findOne(filters, projection, options)
}

/**
 * 
 this is find all cart data
 */

exports.getAllCartProduct = async (
    filters = {},
    projection = null,
    options = {}
) => {
    return await cartModel.find(filters, projection, options)
}

/**
 * Update a record
 */

exports.updateCartData = async (id, updateQuery = {}, options = {}) => {
    return await cartModel.findByIdAndUpdate(id, updateQuery, options)
}

exports.updatallCartData = async (updateQuery = {}, options = {}) => {
    return await cartModel.updateMany(updateQuery, options)
}

exports.getCartWithPopultate = async (condition) => {
    return await cartModel.aggregate([
        {
            $match: condition,
        },
        {
            $lookup: {
                from: 'product_documents',
                localField: 'productId',
                foreignField: '_id',
                as: 'cartData',
            },
        },
        {
            $unwind: {
                path: '$cartData',
                preserveNullAndEmptyArrays: true,
            },
        },
    ])
}

exports.getCartFind = async (ids) => {
    //  return await productModel.find({ "productVariant._id": { $in: ids } });
    return await productModel.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        { $match: { 'productVariant._id': ids } },
    ])
}
exports.deletecart = async (id) => {
    //  return await productModel.find({ "productVariant._id": { $in: ids } });
    // return await cartModel.deleteMany({ quantity: 1 })
    return await cartModel.findByIdAndRemove(id)
}
exports.converttocart = async (id) => {
    //  return await productModel.find({ "productVariant._id": { $in: ids } });
    // return await cartModel.deleteMany({ quantity: 1 })

    return await cartModel.findByIdAndUpdate(id, { saveType: 'cart' })
}
