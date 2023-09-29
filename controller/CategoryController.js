import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient()

export const getAllCategory = async (req,res) => {
    try {
        const categoryList = await prisma.categories.findMany();
        res.status(200)
        res.json({success:true,data:categoryList})
    } catch (error) {
        res.status(500)
        res.json({success:false,data:null})
    }
}
export const addNewCategory = async (req,res) => {
    try {
        const {categoryName} = req.body;
        const categorySchema = Joi.object({name: Joi.string().min(3).max(100).required()});
        const data = {name:categoryName};
        const validation = categorySchema.validate(data);
        if(validation.error) {
            res.status(400);
            res.json({success:false,message:"Invalid category name!"});
        }else{
            await prisma.categories.create({data});
            res.status(200);
            res.json({success:true,message:"Category created successfully!"});
        }
    } catch (error) {
        res.status(500);
        res.json({success:false,message:"Failed to create category!"});
    }
}
export const updateCategory = async (req,res) => {
    try {
        const {categoryName,categoryId} = req.body;
        const categorySchema = Joi.object({name: Joi.string().min(3).max(100).required()});
        const data = {name:categoryName};
        const validation = categorySchema.validate(data);
        if(validation.error) {
            res.status(400);
            res.json({success:false,message:"Invalid category name!"});
        }else{
            await prisma.categories.update({
                where:{id:Number(categoryId)},
                data
            });
            res.status(200);
            res.json({success:true,message:"Updated created successfully!"});
        }
    } catch (error) {
        res.status(500);
        res.json({success:false,message:"Failed to update category!"});
    }
}
export const deleteCategory = async (req,res) => {
    try {
        const {categoryId} = req.params;
        await prisma.categories.delete({where:{id:Number(categoryId)}});
        res.status(200);
        res.json({success:true,message:"Category deleted successfully!"})
    } catch (error) {
        res.status(500);
        res.json({success:true,message:"Failed to delete category!"})
    }
}