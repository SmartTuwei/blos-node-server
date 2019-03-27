const BaseController = require('./base');
module.exports = class ArticlesController extends BaseController {
    //查询分类
    async index(){
        try{
            let items = await this.getPager('Articles',["title","content"]);
            this.success(items);
        }catch(error){
            this.error(error);
        }
    }
    //增加
    async create(){ 
        let {ctx} = this;
        let article = ctx.request.body;
        // console.log(article)
        article.user = this.user;
        try{
            article = await ctx.model.Articles.create(article);
            this.success("发表成功!")  
        }catch(error){
            this.error(error);
        }
    }
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
    async destroy(){
        const {ctx} =this;
        let id = ctx.params.id;
        try{
            await ctx.model.Articles.findByIdAndRemove(id);
            this.success("删除文章成功！");
        }catch(error){
            this.error(error)
        }
    };
    async addPv(){
        const {ctx} = this;
        let id = ctx.params.id;
        try{    
            await ctx.model.Articles.findByIdAndUpdate(id,{$inc:{pv:1}});
            this.success("增加PV成功！")
        }catch(error){
            this.error(error)
        }
    }
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
}