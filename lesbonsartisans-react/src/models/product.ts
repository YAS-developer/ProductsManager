
export default class Product{
    id: Number;
    name: String;
    type: String;
    price: Number;
    rating: Number;
    warranty_years: Number;
    available: boolean;

    constructor(
        id: Number,
        name: String,
        type: String,
        price: Number,
        rating: Number,
        warrantly_years: Number,
        available: boolean
    ){
        this.id = id
        this.name = name
        this.type = type
        this.price = price
        this.rating = rating
        this.warranty_years = warrantly_years
        this.available = available
    }
}