import Joi from "joi";

const productSchema = Joi.object({
    p_name: Joi.string().required(),
    p_slug: Joi.string().required(),
    p_category: Joi.string().required(),
    p_price: Joi.number().positive().required(),
    p_image: Joi.string().required(),
    p_desc: Joi.string().required()    
})

export default productSchema