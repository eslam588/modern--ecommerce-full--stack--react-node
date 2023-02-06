const productModel= require('../models/product.model');


class Product {

    // create product ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    static createProduct = async(req,res) => {
        try{
            let imgurl = await req.file.path.replace("app\\static\\","");
            const createdProduct = new productModel({...req.body , imgurl});
            await createdProduct.save();
            res.status(200).send({apiStatus:true , data:createdProduct, message:"Product Added" })
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})     
        }
    }

     // upload image ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    //  static addImg = async (req,res)=>{
    //     try{
    //         req.body.imgurl = req.file.path.replace("app\\static\\","")
    //         await req.body.save()
    //         // res.status(200).send({apiStatus:true, data:req.body, MessageEvent:"done"})
    //         return imgurl
    //     }
    //     catch(e){
    //         res.status(500).send({apiStatus:false, data:e, message:e.message})
    //     }
    // }

    // get all products ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    
    static getAllProducts = async(req,res) => {  
        try{
            const limit = 9;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            if(!req.query.keyword && !req.query.catName){
                const products = await productModel.find().skip(offset).limit(limit);
                const productsCount = await productModel.count();
                const totalPages = Math.ceil(productsCount / limit);
                res.status(200).send({apiStatus:true , data:{products,paging:{currentPage: page,totalPages:totalPages}}, message:"fetch all products"})
            }
            else if(req.query.catName && !req.query.keyword){
                let catName = req.query.catName
                let cat = catName.split(",")
                const products = await productModel.find({"categoryName" : {$in : cat}}).skip(offset).limit(limit)
                const productscount = await productModel.find({"categoryName" : {$in : cat}})
                const productsCount = productscount.length;
                const totalPages = Math.ceil(productsCount / limit);

            res.status(200).send({apiStatus:true , data:{products,paging:{currentPage: page,totalPages:totalPages}} , message:"fetch all products"})
            }
            else if(req.query.keyword && !req.query.catName){
            let keyword = new RegExp(req.query.keyword,"i")
            const products = await productModel.aggregate([{$match:{title:keyword}}]).skip(offset).limit(limit);
            const productscount = await productModel.aggregate([{$match:{title:keyword}}])
            const productsCount = productscount.length;
            const totalPages = Math.ceil(productsCount / limit);
            res.status(200).send({apiStatus:true , data:{products,paging:{currentPage: page,totalPages:totalPages}}, message:"fetch filtered products"})
           }
        } 
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    

        }
    }

    static getRandomProducts= async(req,res) => {
        try{    
                var mysort = { name: 1 };
                const products = await productModel.find({}).sort(mysort).limit(20)
                res.status(200).send({apiStatus:true , data:{products}})
        } 
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    

        }
    }

    static getProductsByCat= async(req,res) => {
        try{
            if(req.query.catName){
                const products = await productModel.find({"categoryName" : req.query.catName})
                res.status(200).send({apiStatus:true , data:{products}})
            }
        } 
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    

        }
    }

    // static getProductsDiscount= async(req,res) => {
    //     try{
    //             const products = await productModel.find({"discount":{$gt:0}})
    //             console.log(products.length);
    //             res.status(200).send({apiStatus:true , data:{products}})
    //     }
    //     catch(e){
    //         res.status(500).send({apiStatus:false , data:e , message:e.message})    

    //     }
    // }




    // get single product ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    
    static singleProduct = async(req,res) => {
        try{
            const product = await productModel.findById(req.params.id);
            res.status(200).send({apiStatus:true , data:product , message:"fetch single product"})

        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    

        }
    }

    // edit  product ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    
    static editProduct = async(req,res) => {
      try {
              const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body
                }
              );
              res.status(200).json(updatedProduct);
            } catch (err) {
              res.status(500).json(err);
            }
    }

    // delete  product ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    static deleteProduct = async(req,res) => {
        try{
            const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
            res.status(200).send({apiStatus:true , data:deletedProduct, message:"delete product"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    

        }
    }

    // add comment on product

    static addComment = async(req,res) => {
        try{
            let productId=req.params.id;
            console.log(productId)
            console.log(req.body)
            const Product = await productModel.findById(productId).populate("reviews.userId")
            if(!Product) return res.status(404).send({error:'Products Not found',code:404});
            Product.reviews.push(req.body)
            await Product.save();
            res.status(200).send({apiStatus:true , data:Product, message:"Added Comment"})
        }
        catch(e){
            console.log(e.message)
            res.status(500).send({apiStatus:false , data:e , message:e.message})    

        }
    }


    static getAllComments = async (req,res) => {
        try{
            const Product = await productModel.findById(req.params.id).populate("reviews.userId")
            if(!Product) return res.status(404).send({error:'Products Not found',code:404});
            let reviews=Product.reviews;
            res.status(200).send({apiStatus:true , data:reviews, message:"fetch all Comments"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    
        }

    }
    
    // delete a comment

    static deleteComment = async (req,res) => {
        try{
            const Product = await productModel.findById(req.params.id)
            if(!Product) return res.status(404).send({error:'Products Not found',code:404});
            const toDeleteIndex = Product.reviews.findIndex( reviewItem => reviewItem._id.toString() ==  req.query.reviewId);
            if(toDeleteIndex == -1) return res.status(404).send({error:'product Not found',code:404});
            Product.reviews.splice(toDeleteIndex,1);
            await Product.save();
            res.status(200).send("delete comment")
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    
        }

    }

      // update a comment

      static updateComment = async (req,res) => {
        try{
            const Product = await productModel.findById(req.params.id)
            if(!Product) return res.status(404).send({error:'Products Not found', code:404});
            let review = Product.reviews.find( reviewItem => reviewItem._id.toString() == req.query.reviewId);
            if(!review) return res.status(404).send({error:'product Not found',code:404});
            review.commenttext=req.body.commenttext || review.commenttext;
            review.rating=req.body.rating || review.rating;
            await Product.save();
            res.status(200).send("update comment")
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    
        }
    }


    


}

module.exports = Product;