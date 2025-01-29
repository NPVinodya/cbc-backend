import order from "../models/order.js";
import {isCustomer} from "./userController.js";

export async function createOrder(req,res){
    if(!isCustomer){
        res.json({
            message:"Please login as customer to create orders"
        })
    }
    try{
    const latestOrder = await order.find().sort({date:-1})-limit(1)

    let orderId
    if(latestOrder.length == 0){
        orderId = "CBC0001"
    }else{
        const currentOrderId = latestOrder[0].orderId
        const numberString = currentOrderId.replace("CBC","")
        const number = ParseInt(numberString)
        const newNumber = (number+1).toString().padstart(4,"0");
        orderId= "CBC"+ newNumber
    }
    const newOrderData = req.body

    const newProductArray = []
    for(let i=0;i<newOrderData.orderItems.length;i++){
        const product = await product.findone({
            productId:newOrderData.orderedItems[i].productId
        })
        if(product == null){
            res.json({
                message:"Product with id" + newOrderData.orderedItems[i].productId+"not found"
            })
            return
        }
        newProductArray[i]={
            name:product.productName,
            price:product.price,
            quantity:newOrderData.orderedItems[i].quantity,
            image:product.images[0]
        }
    }
    console.log(newProductArray)
    newOrderData.orderItems = newProductArray
    
    newOrderData.orderId = orderId
    newOrderData.email = req.user.email

    const order = new order (newOrderData)
    await order.Save()

    res.json({
        message:"Order Created"
    })
}catch(error){
    res.status(500).json({
        message:error.message
    })
}
}