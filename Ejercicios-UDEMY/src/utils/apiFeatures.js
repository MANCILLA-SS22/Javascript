class APIFeatures{
    constructor(query, queryString){//This is the function that gets automatically called as soon as we create an new object out of this class.
        //query --> It is the mongoose query. We pass a query here becasue we don't want to query inside of this class because that would then bound this class to the tour resource
        //quryString --> It's the query string that we get from express. Basically coming from the route. That's what we usually have access to, in req.query.
        this.query = query;
        this.queryString = queryString;
    }


    filter(){ // Advanced filtering($gte, $gt, $lte, $lt)
        const {page, sort, limit, fields, ...queryObj } = this.queryString; //We create a new object with the provided queries in the following link --> http://localhost:5500/api/v1/tours?duration=5&difficulty=easy&page=2&sort=1&limit=10.

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, event => `$${event}`); //http://localhost:5500/api/v1/tours?duration[gte]=5&difficulty=easy&price[lt]=1500
        
        this.query = this.query.find(JSON.parse(queryStr)); //This return a query      
        
        return this; // It returns the entire object which has access to these other methods so that we can call them there
    }

    sort(){
        if(this.queryString.sort){ //http://localhost:5500/api/v1/tours?sort=price,ratingsAverage    (If we want to sort the elements according to a second parameter, we just need to as a coma ",")
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy); 
        }else{
            this.query = this.query.sort("-createdAt _id"); //According to documentation at Mongo when using $skip with $sort it is advised to include _id or another unique identifier as any duplicates can cause errors (as we have seen).
        }

        return this;
    }

    limitFields(){
        if (this.queryString.fields) { //http://localhost:5500/api/v1/tours?fields=name,duration,difficulty,price
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);  //("name duration, price")
        } else {
            this.query = this.query.select("-__v"); //The minus "-" sign is useful to EXCLUDE. That's to say, we'll include everything except the __v field
        }       

        return this;
    }

    paginate(){
        const initPage = this.queryString.page*1 || 1;
        const initLimit = this.queryString.limit*1 || 100;
        const skip = (initPage - 1) * initLimit;   //http://localhost:5500/api/v1/tours?page=1&limit=3  --> 1-10 page 1, 11-20 page 2, 21-30 page 3
        this.query = this.query.skip(skip).limit(initLimit); //limit() is exactly the same as the limit we defined in the query string (the amount of results that we want in the query). skip(), is the amount of results that should be skipped before querying data. 
        
        return this;
    }
}

export {APIFeatures}