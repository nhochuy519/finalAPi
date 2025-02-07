
const mongoose = require('mongoose')



const  productSize = new mongoose.Schema({
    nameSize:{
        type:String,
        required:[true,"Clothes must be size"]
    },
    quantitySize:{
        type:Number,
        default:0

    }

})

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Product must have a name"],
        trim:true,
        unique:false
        
       
    },
    classify: {
        type:String,
        required:[true,"Products must have classification"]
    },
    price: {
        type:Number,
        required:[true,"Products must have a price"],
        trim:true
    },
    ratings:{
        type:Number,
        default:4.5
    },
    description: {
        type:String,
        trim:true
    },
    size:{
        type:[productSize],
        default:2
    },
    images:[String],
    imageCover:{
        type:String,
        required:[true,'Product must have a name']
    }
    

})


const Products = mongoose.model('Products',productSchema)


module.exports=Products