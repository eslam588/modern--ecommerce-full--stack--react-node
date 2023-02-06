const CategoryModel = require('../models/category.model');

class Category {
    static createCategory = async(req,res) => {
        try{    
               console.log(req.body);
                let categorymodel =  new CategoryModel(req.body);
                await categorymodel.save();
                return res.status(200).send("Category Added");
            }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})     
        }
    }

    static getAllCategories = async(req, res) => {
        try{
            const categories = await CategoryModel.find()
            if(!categories) return res.status(404).send({error:'categories Not found',code:404});
            res.status(200).send({apiStatus:true , data:categories, message:"fetch all Categories"})
        }
        catch(e){
            res.status(500).send({apiStatus:false , data:e , message:e.message})    
        }

    }

}

module.exports = Category