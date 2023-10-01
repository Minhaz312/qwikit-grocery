import fs from 'node:fs'
import { PrismaClient } from "@prisma/client";
import { has } from "../helpers/has.js";
import productSchema from "../helpers/joi-schemas/productSchema.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify";

const prisma = new PrismaClient()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".")[file.originalname.split(".").length-1]
    const fielname = uuidv4() + "." + extension;
    cb(null, fielname)
  }
})

const upload = multer({ 
    storage: storage,
    fileFilter:(req,file,cb)=>{
		const mimeType = file.mimetype;
		const extension = file.originalname.split(".")[file.originalname.split(".").length-1]
		if(mimeType=="image/jpg" || mimeType==="image/jpeg" || mimeType==="image/png" || mimeType==="image/webp") {
			cb(null,true)
		}else {
			cb(new Error(`${extension} is not acceptable`),false)
		}
	}
 }).single("image")

export const getAllProduct = async (req,res) => {
    try {
        const productList = await prisma.productList.findMany()
        const descProductList = productList.reverse()
        res.status(200)
        res.json({success:true,data:descProductList})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,data:[]})
    }
}

export const getProductById = async (req,res) => {
    try {
        const {productId} = req.params;
        const product = await prisma.productList.findUnique({where:{id:Number(productId)}});
        res.status(200)
        res.json({success:true,data:product})
    } catch (error) {
        res.status(500)
        res.json({success:false,data:null})
    }
}

export const addNewProduct = (req,res) => {
    upload(req,res,async err=>{
        if(err){
            console.log('multer file upload err: ',err)
            res.status(400)
            res.status(400).json({success:false,message:err.message})
        }else{
            try {
                const {name,price,desc,category} = req.body;
                const p_image = req.file.filename;
                const p_slug = slugify(name,"-")
                const data = {p_name:name,p_slug,p_image,p_price:Number(price),p_desc:desc,p_category:category};
                const validate = productSchema.validate(data);
                console.log('validate: ',validate)
                if(validate.error){
                    console.log('data validation error')
                    res.status(400)
                    res.json({success:false,message:"Failed to add new product!"})
                }else{
                    console.log('data: ',data)
                    const result = await prisma.productList.create({data});
                    console.log('product created result: ',result)
                    res.status(200)
                    res.json({success:true,message:"New product added successfully!"})
                }
            } catch (error) {
                console.log('error: ',error)
                res.status(500)
                res.json({success:false,message:"Failed to add new product!"})
            }
        }
    })
}

export const searchProductByKeyword = async (req,res) => {
    try {
        const {page,keyword} = req.params;
        const take = 18;
        const skip = Number(page)*take;
        const productList = await prisma.productList.findMany({
            where:{
                OR:[
                    {
                        p_name:{
                            mode:"insensitive",
                            contains:keyword
                        }
                    },
                    {
                        p_desc:{
                            mode:"insensitive",
                            contains:keyword
                        }
                    },
                    {
                        p_category:{
                            mode:"insensitive",
                            contains:keyword
                        }
                    },
                ]
                
            },
            skip:skip,
            take:take,
            orderBy:{id:"desc"}
        })
        const totalProduct = await prisma.productList.aggregate({
            _count:{id:true},
            where:{
                OR:[
                    {
                        p_name:{
                            mode:"insensitive",
                            contains:keyword
                        }
                    },
                    {
                        p_desc:{
                            mode:"insensitive",
                            contains:keyword
                        }
                    },
                    {
                        p_category:{
                            mode:"insensitive",
                            contains:keyword
                        }
                    },
                ]
                
            },
        })
        console.log("productList: ",productList)
        res.status(200);
        res.json({success:true,productList:productList,totalProduct:totalProduct._count.id});
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({success:false,data:[]});
    }
}

export const filterProductByPrice = async (req,res) => {
    try {
        const {from,to,page} = req.body;
        const take = 12;
        const skip = Number(page)*take;
        const productList = await prisma.productList.findMany({
            where:{
                AND:[
                    {
                        p_price:{
                            gte:Number(from)
                        }
                    },
                    {
                        p_price:{
                            lte:Number(to)
                        }
                    },
                ]
            },
            skip:skip,
            take:take,
            orderBy:{id:"desc"}
        })
        const totalProduct = await prisma.productList.aggregate({
            _count:{id:true},
            where:{
                AND:[
                    {
                        p_price:{
                            gte:Number(from)
                        }
                    },
                    {
                        p_price:{
                            lte:Number(to)
                        }
                    },
                ]
            },
        })
        console.log("productList: ",productList)
        res.status(200);
        res.json({success:true,productList:productList,totalProduct:totalProduct._count.id});
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({success:false,data:[]});
    }
}

export const filterProductByCategory = async (req,res) => {
    try {
        const {category,page} = req.params;
        const take = 12;
        const skip = Number(page)*take;
        const productList = await prisma.productList.findMany({
            where:{
                p_category:category
            },
            skip:skip,
            take:take,
            orderBy:{id:"desc"}
        })
        const totalProduct = await prisma.productList.aggregate({
            _count:{id:true},
            where:{
                p_category:category
            },
        })
        console.log("productList: ",productList)
        res.status(200);
        res.json({success:true,productList:productList,totalProduct:totalProduct._count.id});
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({success:false,data:[]});
    }
}

export const updateProduct = async (req,res) => {
    try {
        const body = req.body;
        let updatedData = {}
        if(has(body,"name")){
            updatedData.p_name = body.name
            const slug = slugify(body.name,"-")
            updatedData.p_slug = slug
        }
        if(has(body,"category")){
            updatedData.p_category = body.category
        }
        if(has(body,"image")){
            updatedData.p_image = body.image
        }
        if(has(body,"price")){
            updatedData.p_price = body.price
        }
        if(has(body,"desc")){
            updatedData.p_desc = body.desc
        }
        if(has(body,"name")){
            updatedData.p_name = body.name
        }
        await prisma.productList.update({
            where:{
                id:Number(body.productId)
            },
            data:updatedData
        })
        res.status(200)
        res.json({success:true,message:"Product updated successfully!"});
    } catch (error) {
        res.status(500)
        res.json({success:true,message:"Failed to update product"});
    }
}

export const deleteProductById = async (req,res) => {
    try {
        const {productId} = req.params;
        const productImage = await prisma.productList.findUnique({where:{id:Number(productId)},select:{p_image:true}});
        await prisma.productList.delete({
            where:{
                id:Number(productId)
            }
        });
        fs.unlink(process.cwd()+"/public/"+productImage.p_image,err=>{
            console.log(err)
        })
        res.status(200)
        res.json({success:true,message:"Product deleted successfully!"});
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,message:"Failed to delete product!"});
    }
}

export const getPaginatedProduct = async (req,res) => {
    try {
        const {page} = req.params;
        console.log('page: ',page)
        const take = 15;
        const skip = Number(page)*take;
        const productList = await prisma.productList.findMany({
            take:take,
            skip:skip,
            orderBy:{
                id:"desc"
            }
        });
        const totalProduct = await prisma.productList.count();
        res.status(200);
        res.json({success:true,productList:productList,totalProduct});
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({success:false,data:[]});
    }
}