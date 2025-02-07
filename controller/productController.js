const Products = require('../modules/productModule');
const  mongoose = require('mongoose');
const AppError = require('../utils/appError')



const catchAsync = require('../utils/catchAsync')


const aliasGirls = (req,res,next) =>{
    req.query.classify = "girl";
    next()
}   
const aliasBoys = (req,res,next) =>{
    req.query.classify = "men";
    next()
}
const aliasChildren = (req,res,next) =>{
    req.query.classify = "children";
    next()
}


class ApiFeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString =queryString;
    }

    filter() {
        let queryObj = { ...this.queryString };
        console.log(this.queryString)
        if(this.queryString.q) {
            queryObj ={ name: { $regex: this.queryString.q, $options: 'i' } }
        }
        this.query= this.query.find(queryObj)
        return this
        
    }

    // filterPart() {
        
    //     if (this.queryString.q) {
    //         this.query = this.query.find({ name: { $regex: this.queryString.q, $options: 'i' } });
    //         // options khong phan biet hoa thuong
    //         console.log(this.query)
    //     }
    //     return this;
    // }
}



const getProduct =catchAsync( async(req,res,next) =>{

        const apiProducts = new ApiFeatures(Products.find(),req.query)
        
        apiProducts.filter()
        
        const products = await apiProducts.query
        console.log(products)
        res.status(200).json({
           status:"success",
           resultLenght:products.length,
           data:{
            products,
           }
        })
    

    
})
const postProduct = catchAsync(async(req,res,next)=>{
        const product =await Products.create(req.body);
        res.status(200).json({
            status:'success',
            data:{
                product,
            }

        })


})

const UpdateProduct =catchAsync(async(req,res,next)=>{
    const _id = req.params.id;
    // hàm kiểm tra id có hợp lệ hay không
    const isValidId = mongoose.Types.ObjectId.isValid(_id)
    
    if(!isValidId) {
        return next(new AppError('No tour found',404))
    }
    
    const product =await Products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true // thiết lập cho trình xác thực chạy
    });
    res.status(200).json({
        status:'success',
        data:{
            product,
        }

    })


})
const DeleteProduct =catchAsync(async(req,res,next)=>{
    console.log('thực hiện delete');
    const _id = req.params.id;
    // hàm kiểm tra id có hợp lệ hay không
    const isValidId = mongoose.Types.ObjectId.isValid(_id)
    
    if(!isValidId) {
        return next(new AppError('No user found',404))
    }
    

    const product =await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'success',
        data:{
            product,
        }

    })


})

module.exports={
    getProduct,
    aliasGirls,
    aliasBoys,
    aliasChildren ,
    postProduct,
    UpdateProduct,
    DeleteProduct
}