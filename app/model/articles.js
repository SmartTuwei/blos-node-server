module.exports = app =>{
    let mongoose = app.mongoose;
    let Schema  = mongoose.Schema;
    const ObjectId = Schema.Types.ObjectId;
    let ArticleSchema = new Schema({
        title:{type:String,required:true},//标题
        content:{type:String,require:true},//正文
        user:{type:ObjectId,ref:'User'},//用户作者
        pv:{type:Number,default:0},//page view 
        comments:[ //评论
            {user:{type:ObjectId,ref:'User'},content:String}
        ],
        createAt:{type:Date,default:Date.now}
    })
    const Article = mongoose.model("Articles",ArticleSchema);
    return Article;
}