import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productShema = new Schema({
    title: String,
    description: String,
    price: {type: Number, index: true},
    thumbnail: String,
    code: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    category: String,
    owner: {
        type: String,
        default: ["ADMIN"]
    },
    id: Number
});

productShema.plugin(mongoosePaginate)
const productModel = model("products", productShema);
export default productModel;