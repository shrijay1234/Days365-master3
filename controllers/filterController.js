const productService = require('../services/productService')
const mongoose = require('mongoose')

exports.filter = async (req, res, next) => {
    try {
      
        let response = {}
        if(req.query.type == "categoryName")
        {
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

        
    if (req.body.minprice || req.body.maxprice || req.body.brandName)
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
    }
    else if(req.query.type == "featured"){

        var filters = {
            topfeaturedandotherfields: "topfeature"
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

       if (req.body.minprice || req.body.maxprice || req.body.brandName)
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

    }
    else if(req.query.type == "bestseller"){

        var filters = {
            topfeaturedandotherfields: "Bestseller"
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

       if (req.body.minprice || req.body.maxprice || req.body.brandName)
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

    }
    else if(req.query.type == "latest"){
        

        if(req.body.minprice && req.body.maxprice && req.body.brandName)
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


    }
    else if(req.query.title ){



console.log(req.query.title)
        var filters = {"title":{ $regex: req.query.title, $options : 'i'}}
        

       
 
             var result = await productService.getAllProductofhomepage(filters)



console.log(result)
   
       
           
            
            
    

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

    }
    } catch (error) {
        console.log('rrrrrrrrrrrrrrrrrrr', error)
        next({})
    }
}

