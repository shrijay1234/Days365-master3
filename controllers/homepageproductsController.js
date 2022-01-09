const productService = require('../services/productService')
const mongoose = require('mongoose')

exports.topfeaturedandotherfieldsproducts = async (req, res, next) => {
    try {
      
        let response = {}
        var filters = {
            topfeaturedandotherfields: req.body.topfeaturedandotherfields
        }

        if(req.body.minprice && req.body.maxprice && req.body.brandName)
        {

            var filters = {
                
                $and :[
                    {"brandName" : { "$in": req.body.brandName }}, 
                    {topfeaturedandotherfields: req.body.topfeaturedandotherfields },
                    {salePrice:{ $gte: req.body.minprice, $lte: req.body.maxprice }}]
                
                 }
     
 
             var result = await productService.getAllProductofhomepage(filters,req.body.ordername,req.body.orderby)


        }
        else{
        if (req.body.minprice && req.body.maxprice) {
            
            var filters = {
               $and: [{topfeaturedandotherfields: req.body.topfeaturedandotherfields},{salePrice:{ $gte: req.body.minprice, $lte: req.body.maxprice }}]
            }
    
           
            
            
            var result = await productService.getAllProductofhomepage(filters,req.body.ordername,req.body.orderby)
        }
        if (req.body.brandName) {
            
            var filters = {
                
               $and :[
                   {"brandName" : { "$in": req.body.brandName }}, 
                   {topfeaturedandotherfields: req.body.topfeaturedandotherfields }]
               
                }
    

            var result = await productService.getAllProductofhomepage(
                filters,req.body.ordername,req.body.orderby
            )
        }
    }

        if (req.body.limit == true)
            var result = await productService.getAllProductofhomepagewithlimit(
                filters
            )
       else if (req.body.minprice || req.body.maxprice || req.body.brandName)
        {}
        else
        {
            var result = await productService.getAllProductofhomepage(filters,req.body.ordername,req.body.orderby)
        }

        if (result.length > 0) {
            response = {
                message: 'Home page products successfully retrieved',
                error: false,
                data: result,
            }
        } else {
            response = {
                message: 'Faild to get products',
                error: true,
                data: {},
            }
        }

        res.status(200).json(response)
    } catch (error) {
        console.log('rrrrrrrrrrrrrrrrrrr', error)
        next({})
    }
}

exports.latestproducts = async (req, res, next) => {
    try {
        let response = {}

        if (req.body.limit == true)
        {
            var result = await productService.getAllProductlatestwithlimit()
        }
        else if(req.body.minprice && req.body.maxprice && req.body.brandName)
        {

            var filters = {
                
                $and :[
                    {"brandName" : { "$in": req.body.brandName }}, 
                    {salePrice:{ $gte: req.body.minprice, $lte: req.body.maxprice }}]
                
                 }
     
 
             var result = await productService.getAllProductlatest(filters,req.body.ordername,req.body.orderby)


        }else if(req.body.minprice && req.body.maxprice) {
            
            var filters = {salePrice:{ $gte: req.body.minprice, $lte: req.body.maxprice }}
            
    
           
            
            
            var result = await productService.getAllProductlatest(filters,req.body.ordername,req.body.orderby)
        }
        else if(req.body.brandName) {
            
            var filters = {"brandName" : { "$in": req.body.brandName }}
    

            var result = await productService.getAllProductlatest(
                filters,req.body.ordername,req.body.orderby
            )
        }
        else{

            

            var result = await productService.getAllProductlatest(filters={},req.body.ordername,req.body.orderby)
        }
        
        
        if (result.length > 0) {
            response = {
                message: 'Home page products successfully retrieved',
                error: false,
                data: result,
            }
        } else {
            response = {
                message: 'Faild to get products',
                error: true,
                data: {},
            }
        }

        res.status(200).json(response)
    } catch (error) {
        console.log('rrrrrrrrrrrrrrrrrrr', error)
        next({})
    }
}



exports.categoryproduct = async (req, res, next) => {

    try {
      
        let response = {}
        var filters = {
            categoryName: req.body.categoryName
        }

        if(req.body.minprice && req.body.maxprice && req.body.brandName)
        {

            var filters = {
                
                $and :[
                    {"brandName" : { "$in": req.body.brandName }}, 
                    {categoryName: req.body.categoryName },
                    {salePrice:{ $gte: req.body.minprice, $lte: req.body.maxprice }}]
                
                 }
     
 
             var result = await productService.getAllProductofhomepage(filters,req.body.ordername,req.body.orderby)


        }
        else{
        if (req.body.minprice && req.body.maxprice) {
            
            var filters = {
               $and: [{categoryName: req.body.categoryName},{salePrice:{ $gte: req.body.minprice, $lte: req.body.maxprice }}]
            }
    
           
            
            
            var result = await productService.getAllProductofhomepage(filters,req.body.ordername,req.body.orderby)
        }
        if (req.body.brandName) {
            
            var filters = {
                
               $and :[
                   {"brandName" : { "$in": req.body.brandName }}, 
                   {categoryName: req.body.categoryName }]
               
                }
    

            var result = await productService.getAllProductofhomepage(
                filters,req.body.ordername,req.body.orderby
            )
        }
    }

        if (req.body.limit == true)
            var result = await productService.getAllProductofhomepagewithlimit(
                filters
            )
       else if (req.body.minprice || req.body.maxprice || req.body.brandName)
        {}
        else
        {
            console.log("calling")
            var result = await productService.getAllProductofhomepage(filters,req.body.ordername,req.body.orderby)
        }

        if (result.length > 0) {
            response = {
                message: 'Home page products successfully retrieved',
                error: false,
                data: result,
            }
        } else {
            response = {
                message: 'Faild to get products',
                error: true,
                data: {},
            }
        }

        res.status(200).json(response)
    } catch (error) {
        console.log('rrrrrrrrrrrrrrrrrrr', error)
        next({})
    }

}