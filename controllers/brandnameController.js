const brandService = require('../services/brandService');

const mongoose = require('mongoose');
const { response } = require('../app');
//brand

exports.getbrandname  = async(req, res, next) => {
    try{
        // let options = {};
        // if(req.body && req.body.type =="seller"){
        //     options = {"status":{ $in: req.body.status},"sellerId": mongoose.Types.ObjectId(req.user.id)}  
        // }else{
        //     options = {"status":{ $in: req.body.status}}
        // }
        // console.log("#################3333",options);
        // const result = await brandService.getBrand(options,null, { lean: true });
        
        const result = await brandService.getBrandname();
        var response = { message: "No Record Found.", error: true, data: [] };
        if(result){
            response = { message: "Successfully retrieved products.", error: false, data: result};
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);

    }catch (error) {
        console.log(error);
        next({});
    }
}

