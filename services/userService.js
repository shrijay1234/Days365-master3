const { userRegisterModel } = require('../models/userRegister');



exports.getUserDetails = async (filters = {}) => {
    return await userRegisterModel.findOne(filters);
}


exports.updateUserDetails = async (filters = {}, reqBody = {}) => {
  
    return await userRegisterModel.findOneAndUpdate(filters,reqBody );
}


