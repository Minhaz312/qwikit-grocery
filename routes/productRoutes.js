import express from 'express'
const productRouter = express.Router()
import { addNewProduct, deleteProductById, filterProductByCategory, filterProductByPrice, getAllProduct, getPaginatedProduct, getProductById, searchProductByKeyword, updateProduct } from "../controller/ProductController.js";


// get product
productRouter.get("/get/all",getAllProduct);
productRouter.get("/get/:productId",getProductById);
productRouter.get("/get/page/:page",getPaginatedProduct);

// filter product
productRouter.get("/search/:keyword/page/:page",searchProductByKeyword)
productRouter.get("/filter-by/price/:price/page/:page",filterProductByPrice)
productRouter.get("/filter-by/category/:category/page/:page",filterProductByCategory)

// product manipulation
productRouter.post("/add",addNewProduct);
productRouter.put("/update",updateProduct);
productRouter.delete("/delete/:productId",deleteProductById);

export default productRouter