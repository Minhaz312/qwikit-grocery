import express from 'express'
import { addNewCategory, deleteCategory, getAllCategory, updateCategory } from '../controller/CategoryController.js'
const categoryRouter = express.Router()

categoryRouter.get("/get/all",getAllCategory);
categoryRouter.post("/add",addNewCategory)
categoryRouter.put("/update",updateCategory)
categoryRouter.delete("/delete/:categoryId",deleteCategory);

export default categoryRouter;

