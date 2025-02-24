import ProductList from "@/components/shared/products/product-list";
import sampleData from "@/db/sample-data";


function Homepage() {
    return <ProductList data={sampleData.products} title='Newst Arrivals' limit={4}/>
}

export default Homepage;

/* function delay(ms: number){
    return new Promise((res) => setTimeout(res, ms))
}

async function Homepage() {
    await delay(2000)
    return (
        <></>
    )
}

export default Homepage; */