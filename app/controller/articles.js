const BaseController = require('./base');
module.exports = class ArticlesController extends BaseController {
    //查询分类
    async index(){
        try{
            //'Articles',["title","content"],['category']
            let items = await this.getPager({
                modelName:"Articles",
                fields:["title","content"],
                populateFields:["category","user","comments.user"]
            });
            this.success(items);
        }catch(error){
            this.error(error);
        }
    }
    //增加
    async create(){ 
        let {ctx} = this;
        let article = ctx.request.body;
        console.log(article)
        article.user = this.user;
        try{
            article = await ctx.model.Articles.create(article);
            this.success("发表成功!")  
        }catch(error){
            this.error(error);
        }
    }
    //更新文章
    async update(){
        const {ctx} = this;
        let id = ctx.params.id;
        let article = ctx.request.body;
        try{
            await ctx.model.Articles.findByIdAndUpdate(id,article);
            this.success("文章更新成功!");
        }catch(error){
            console.log(error);
        }
    }
     //删除文章
    async destroy(){
        const {ctx} =this;
        let id = ctx.params.id;
        let {ids}=ctx.request.body;
        ids.push(id);
        try{
            //$in 解析数组 只要_id满足数组ids中的条件 批量删除数据
            await ctx.model.Articles.remove({_id:{$in:ids}});
            this.success("删除文章成功！");
        }catch(error){
            this.error(error)
        }
    };
     //增加访问
    async addPv(){
        const {ctx} = this;
        let id = ctx.params.id;
        try{
             //$inc  通过id 找到当前数据 inc让数据中字段加一    
            await ctx.model.Articles.findByIdAndUpdate(id,{$inc:{pv:1}});
            this.success("增加PV成功！")
        }catch(error){
            this.error(error)
        }
    }
    //增加评论
    async addComment(){
        const {ctx} = this;
        let id = ctx.params.id;
        let comment = ctx.request.body;
        comment.user = this.user;
        try{
            await ctx.model.Articles.findByIdAndUpdate(id,{$push:{comments:comment}});
            this.success("评论成功!");
        }catch(error){

        }
    }
    //删除评论
    async removeComment(){
        const {ctx} = this;
        let {article_id,comment_id} = ctx.params;
        try{
            await ctx.model.Articles.findByIdAndUpdate(article_id,{$pull:{comments:{_id:comment_id}}});
            this.success("删除评论成功!");
        }catch(error){

        }
    }  
}