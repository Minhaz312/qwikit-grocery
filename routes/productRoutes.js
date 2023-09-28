import router from ".";
import { getAllProduct } from "../controller/ProductController.js";

const productRouter = router;

productRouter.get("/get/all",getAllProduct)

export default productRouter