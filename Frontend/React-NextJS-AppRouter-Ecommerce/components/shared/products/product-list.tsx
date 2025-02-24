import ProductCard from "./product-card";


function ProductList({ data, title, limit }: { data: any; title?: string; limit?: number }) {
    const limitedData = limit ? data.slice(0, limit) : data;

    function render() {
        if (data.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {limitedData.map((product: any) => <ProductCard key={product.slug} product={product}/>)}
                </div>
            )
        } else {
            return (
                <div>
                    <p>No products found!</p>
                </div>
            )
        }
    }

    return (
        <div className="my-10">
            <h2 className="h2-bold mb-4">{title}</h2>
            {render()}
        </div>
    );
}

export default ProductList;