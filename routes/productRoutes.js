import express from 'express'
const productRouter = express.Router()
import { addNewProduct, deleteProductById, filterProductByCategory, filterProductByPrice, getAllProduct, getProductById, searchProductByKeyword, updateProduct } from "../controller/ProductController.js";


// get product
productRouter.get("/get/all",getAllProduct);
productRouter.get("/get/:productId",getProductById);

// filter product
productRouter.post("/search",searchProductByKeyword)
productRouter.post("/filter-by/price",filterProductByPrice)
productRouter.post("/filter-by/category",filterProductByCategory)

// product manipulation
productRouter.post("/add",addNewProduct);
productRouter.put("/update",updateProduct);
productRouter.delete("/delete/:productId",deleteProductById);

export default productRouter