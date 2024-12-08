import Product from "../models/product.js";

export async function getProduct(req,res){
    try{
        const productList= await Product.find()
            res.json({
                list:productList
            })
        }catch(e){
            res.json({
                message:"Error"
            })
        }}
    
export function createProduct(req,res){    
    console.log(req.user)
    if(req.user == null){
        res.json({
            message:"You are not logged in"
            })
            return
        }
        if(req.user.type != "admin"){
            res.json({
                message:"You are not an admin"
                })
                return
        }
        const product = new Product(req.body)

        product.save().then(()=>{
        res.json({
            message:"Product Created"
            })
    }).catch(()=>{
        res.json({
            message:"Product not Created"
        })
    })}

export function deleteProduct(req,res){
    Product.deleteOne =({name:req.body.name}).then(()=>{
        res.json({
            message:"Product deleted successfully"
            })
    }).catch(()=>{
        res.json({
            message:"Product not deleted"
        })
    })
}
export function getProductByName(req,res){
    const name =req.body.name
    Product.find({name:name}).then(
        (productList)=>{
            res.json({
                list:productList
            })
        }
    ).catch(
        ()=>{
        res.json({
            message:"Error"
        })
    })
}
