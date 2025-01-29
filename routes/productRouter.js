import express from 'express';
import { createProduct,  getProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",getProducts)
//productRouter.get("/byName",getProductByName)
productRouter.post("/",createProduct)
//productRouter.delete("/",deleteProduct)
    

export default productRouter;