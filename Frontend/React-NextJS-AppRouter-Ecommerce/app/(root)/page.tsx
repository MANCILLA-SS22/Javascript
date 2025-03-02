import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

async function Homepage() {
    const latestProducts = await getLatestProducts();
    return <ProductList data={latestProducts} title='Newst Arrivals'/>
}

export default Homepage;