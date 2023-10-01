import { getAllCategory } from "@/actions/category";
import { getPaginatedProduct } from "@/actions/product/getProducts";
import HomeRenderer from "@/components/home/HomeRenderer";


export default async function Home() {
   
  const categoryList = await getAllCategory()
  const productList = await getPaginatedProduct(0)


  return (
    <main className="min-h-screen py-3">
      <HomeRenderer categoryList={categoryList} productList={productList} />
    </main>
  )
}
