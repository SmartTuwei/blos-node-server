module.exports = (app)=>{
    let mongoose = app.mongoose;
    let Schema  = mongoose.Schema;
    let CategorySchema = new Schema({
        name:{type:String}
    })
    let Category = mongoose.model("Category",CategorySchema);
    return Category;
}
