import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productShema = new Schema({
    title: String,
    description: String,
    price: {type: Number, index: true},
    thumbnail: Array,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
    id: Number
});

productShema.plugin(mongoosePaginate)
const productModel = model("products", productShema);
export default productModel;